const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("aubitDesktop", {
  isDesktopShell: true,
  enterWidgetMode: () => ipcRenderer.invoke("shell:enter-widget-mode"),
  exitWidgetMode: () => ipcRenderer.invoke("shell:exit-widget-mode"),
  openMainWindow: () => ipcRenderer.invoke("shell:open-main-window"),
  quitDesktopShell: () => ipcRenderer.invoke("shell:quit"),
  wakeDesktopWidget: () => ipcRenderer.invoke("shell:widget-wake"),
  onShellEvent: (callback) => {
    if (typeof callback !== "function") {
      return () => {};
    }

    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("shell:event", listener);
    return () => {
      ipcRenderer.removeListener("shell:event", listener);
    };
  },
});
