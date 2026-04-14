import json
from urllib import error, request

from app.config import get_settings


class OpenAIClient:
    def __init__(self) -> None:
        self.settings = get_settings()

    def generate_response(self, prompt: str, context: dict) -> str:
        if self.settings.ai_provider == "gemini" and self.settings.gemini_api_key:
            try:
                return self._generate_with_gemini(prompt, context)
            except ValueError:
                return self._build_fallback_response(prompt, context, "Gemini was unavailable")

        if self.settings.openai_api_key:
            return "OpenAI API key is configured, but the live OpenAI request flow is not implemented yet."

        return self._build_fallback_response(prompt, context, "No external AI provider is configured")

    def _build_fallback_response(self, prompt: str, context: dict, reason: str) -> str:
        topic = context.get("topic") or "your request"
        return (
            f"Aubit processed {topic}. Prompt received: {prompt}. "
            f"This is the local fallback response because {reason.lower()}."
        )

    def _generate_with_gemini(self, prompt: str, context: dict) -> str:
        topic = context.get("topic", "general assistance")
        response_style = context.get("response_style", "")
        system_instruction = (
            "You are Aubit, a helpful AI companion for study, games, and voice interactions. "
            "Respond clearly, keep explanations practical, and adapt to the user's topic. "
            "If response_style is direct_answer and the user is asking an arithmetic or logic question, "
            "give the final answer first and keep the reply brief. Do not add a long explanation unless asked."
        )
        endpoint = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.settings.gemini_model}:generateContent?key={self.settings.gemini_api_key}"
        )
        payload = {
            "system_instruction": {
                "parts": [{"text": system_instruction}],
            },
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": (
                                f"Context topic: {topic}\n"
                                f"Extra context: {json.dumps(context, ensure_ascii=True)}\n"
                                f"User prompt: {prompt}"
                            )
                        }
                    ],
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topP": 0.9,
                "maxOutputTokens": 512,
            },
        }
        body = json.dumps(payload).encode("utf-8")
        req = request.Request(
            endpoint,
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with request.urlopen(req, timeout=20) as response:
                response_payload = json.loads(response.read().decode("utf-8"))
        except error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="ignore")
            raise ValueError(f"Gemini request failed with status {exc.code}: {detail}") from exc
        except error.URLError as exc:
            raise ValueError(f"Gemini request failed: {exc.reason}") from exc

        candidates = response_payload.get("candidates") or []
        if not candidates:
            raise ValueError("Gemini returned no candidates")

        parts = candidates[0].get("content", {}).get("parts", [])
        text_parts = [part.get("text", "") for part in parts if part.get("text")]
        if not text_parts:
            raise ValueError("Gemini returned an empty response")

        return "\n".join(text_parts).strip()


class VoiceClient:
    def __init__(self) -> None:
        self.settings = get_settings()

    def synthesize_preview(self, text: str) -> dict:
        if self.settings.elevenlabs_api_key:
            return {
                "provider": "elevenlabs",
                "status": "configured",
                "message": "Wire the real ElevenLabs request here.",
            }

        return {
            "provider": "local-fallback",
            "status": "simulated",
            "preview_text": text[:120],
        }
