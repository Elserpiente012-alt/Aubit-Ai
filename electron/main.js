const path = require("node:path");
const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, screen } = require("electron");

const appRoot = path.resolve(__dirname, "..");
const preloadPath = path.join(__dirname, "preload.js");
const mainEntryPath = path.join(appRoot, "index.html");
const widgetEntryPath = path.join(appRoot, "widget.html");
const appIconPngPath = path.join(appRoot, "build", "icon.png");
const appIconIcoPath = path.join(appRoot, "build", "icon.ico");
const appIconPath = process.platform === "win32" ? appIconIcoPath : appIconPngPath;
const trayIconPath = appIconPngPath;

let mainWindow = null;
let widgetWindow = null;
let tray = null;
let isQuitting = false;

function broadcastShellEvent(payload) {
  [mainWindow, widgetWindow].forEach((win) => {
    if (win && !win.isDestroyed()) {
      win.webContents.send("shell:event", payload);
    }
  });
}

function createMainWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    width: 1600,
    height: 980,
    minWidth: 1240,
    minHeight: 760,
    show: false,
    title: "Aubit Desktop",
    icon: appIconPath,
    backgroundColor: "#f8f4ee",
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  mainWindow.loadFile(mainEntryPath);
  mainWindow.once("ready-to-show", () => {
    if (!widgetWindow?.isVisible()) {
      mainWindow.show();
    }
  });
  mainWindow.setIcon(appIconPath);
  mainWindow.setAppDetails({
    appId: "com.aubit.desktopassistant",
    appIconPath,
    appIconIndex: 0,
    relaunchCommand: process.execPath,
  });

  mainWindow.on("close", (event) => {
    if (isQuitting) {
      return;
    }

    event.preventDefault();
    enterWidgetMode({ trigger: "main-close" });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  return mainWindow;
}

function placeWidgetWindow() {
  if (!widgetWindow || widgetWindow.isDestroyed()) {
    return;
  }

  const display = screen.getPrimaryDisplay();
  const { width, height, x, y } = display.workArea;
  const bounds = widgetWindow.getBounds();
  const nextX = Math.round(x + width - bounds.width - 28);
  const nextY = Math.round(y + height - bounds.height - 42);
  widgetWindow.setPosition(nextX, nextY);
}

function createWidgetWindow() {
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    return widgetWindow;
  }

  widgetWindow = new BrowserWindow({
    width: 320,
    height: 240,
    minWidth: 280,
    minHeight: 210,
    maxWidth: 360,
    maxHeight: 280,
    show: false,
    frame: false,
    transparent: true,
    resizable: true,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    title: "Aubit Widget",
    icon: appIconPath,
    backgroundColor: "#00000000",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  widgetWindow.loadFile(widgetEntryPath);
  widgetWindow.once("ready-to-show", () => {
    placeWidgetWindow();
  });

  widgetWindow.on("closed", () => {
    widgetWindow = null;
  });

  widgetWindow.setAlwaysOnTop(true, "screen-saver");
  widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  widgetWindow.setIcon(appIconPath);

  return widgetWindow;
}

function showMainWindow(trigger = "system") {
  createMainWindow();
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    widgetWindow.hide();
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();
  }

  broadcastShellEvent({ type: "immersive-mode-entered", trigger });
}

function enterWidgetMode(options = {}) {
  const trigger = options.trigger || "system";
  createWidgetWindow();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
  }

  if (widgetWindow && !widgetWindow.isDestroyed()) {
    placeWidgetWindow();
    if (typeof widgetWindow.showInactive === "function") {
      widgetWindow.showInactive();
    } else {
      widgetWindow.show();
    }
  }

  broadcastShellEvent({ type: "widget-mode-entered", trigger });
}

function createTray() {
  if (tray) {
    return tray;
  }

  const baseIcon = nativeImage.createFromPath(trayIconPath);
  const trayIcon = baseIcon.isEmpty() ? baseIcon : baseIcon.resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  tray.setToolTip("Aubit Desktop");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show Widget",
        click: () => enterWidgetMode({ trigger: "tray-widget" }),
      },
      {
        label: "Open Immersive App",
        click: () => showMainWindow("tray-main"),
      },
      { type: "separator" },
      {
        label: "Quit Aubit",
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ]),
  );
  tray.on("double-click", () => {
    if (widgetWindow?.isVisible()) {
      showMainWindow("tray-double-click");
      return;
    }

    enterWidgetMode({ trigger: "tray-double-click" });
  });

  return tray;
}

ipcMain.handle("shell:enter-widget-mode", () => {
  enterWidgetMode({ trigger: "renderer-request" });
  return { ok: true };
});

ipcMain.handle("shell:exit-widget-mode", () => {
  showMainWindow("widget-request");
  return { ok: true };
});

ipcMain.handle("shell:open-main-window", () => {
  showMainWindow("renderer-request");
  return { ok: true };
});

ipcMain.handle("shell:quit", () => {
  isQuitting = true;
  app.quit();
  return { ok: true };
});

ipcMain.handle("shell:widget-wake", () => {
  enterWidgetMode({ trigger: "wake-request" });
  return { ok: true };
});

app.whenReady().then(() => {
  app.setAppUserModelId("com.aubit.desktopassistant");
  Menu.setApplicationMenu(null);
  createMainWindow();
  createWidgetWindow();
  createTray();
  screen.on("display-metrics-changed", () => {
    placeWidgetWindow();
  });

  app.on("activate", () => {
    showMainWindow("activate");
  });
});

app.on("before-quit", () => {
  isQuitting = true;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
