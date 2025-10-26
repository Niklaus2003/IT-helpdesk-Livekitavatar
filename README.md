# AI IT Helpdesk Agent

A voice-first AI assistant that automates and streamlines internal IT support. Employees interact with a conversational agent (voice + optional text) through a modern web UI. The agent runs as a LiveKit Cloud-hosted Python agent and uses Deepgram for realtime speech, Azure OpenAI for reasoning, and an optional Beyond Presence 3D avatar for an expressive agent presence. If the assistant cannot resolve an issue, it can automatically raise a support ticket by sending a formatted email to the IT department.

---

## Live Demo

Live demo (placeholder): {https://it-helpdesk-agent.netlify.app]

[IT Helpdesk Agent UI]

---

## Introduction

This project provides a human-friendly way for employees to get help with common IT problems using a natural voice conversation. The agent can perform step-by-step troubleshooting for issues such as password resets, network connectivity, email configuration, printer problems, and VPN access. When necessary, it can create a support ticket by sending an email to IT with the relevant details.

The backend (Python LiveKit Agent) is already deployed to LiveKit Cloud; the README below focuses on setting up and running the frontend locally to connect to the deployed agent.

---

## Features

- Voice-First Interaction: Real-time, natural conversations powered by Deepgram STT and TTS.
- AI-Powered Troubleshooting: Uses Azure OpenAI and a set of function-like tools to provide structured guidance for:
  - Password resets and account unlocks
  - Network & Wi-Fi troubleshooting
  - Email client configuration and sync issues
  - Printer installation and error resolution
  - Hardware diagnostics (basic checks)
  - VPN connection troubleshooting
- Automated Ticket Creation: Raises a support ticket by sending a formatted SMTP email to IT on user confirmation.
- Interactive 3D Avatar (optional): Integrates Beyond Presence for a real-time 3D avatar view of the agent.
- Web-Based Interface: Next.js UI with live transcription/chat, media controls, and light/dark theme (Tailwind CSS).
- Cloud-Native Agent: Python LiveKit Agent deployed on LiveKit Cloud for low-latency real-time media and agent orchestration.

---

## Tech Stack

- Frontend
  - Next.js 14
  - React
  - TypeScript
  - LiveKit Client SDK (web)
  - Tailwind CSS
- Backend (Agent)
  - Python
  - livekit-agents SDK (Python)
  - Agent tooling to call troubleshooting functions and SMTP ticket creation
- AI & Services
  - LiveKit (media / rooms)
  - Azure OpenAI (LLM)
  - Deepgram (STT/TTS)
  - Beyond Presence (3D avatar — optional)
  - SMTP or mail provider for ticket emails

---

## Getting Started (Frontend)

This section describes how to set up and run the frontend locally so it can connect to the already-deployed LiveKit Python agent.

### Prerequisites

- Node.js v18 or later
- npm or Yarn
- A LiveKit Cloud account and the Python agent already deployed (agent is managed on LiveKit Cloud)
- Credentials/API keys for services used by the backend agent (Azure OpenAI, Deepgram, LiveKit) — note: these are configured server-side on the agent; for local frontend development you usually only need a token generator endpoint or a local API that returns a LiveKit token
- (Optional) A working SMTP account for ticket-sending if you run a local agent or test the ticket tool locally

### Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/Niklaus2003/IT-helpdesk-Livekitavatar.git
cd IT-helpdesk-Livekitavatar/IT-helpdesk-ui/my-livekit-agent-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create the environment file

Create a `.env.local` file in the `my-livekit-agent-frontend` directory. This file configures how the frontend requests connection details (LiveKit tokens). The frontend does not store LLM/STT keys — those remain on the backend agent.

.env.local template (place this exact block into `.env.local`):

```env
# This endpoint is called by the frontend to get connection details.
# It should point to your own backend that can generate a LiveKit token.
# For local testing, you can use the provided Next.js API route.
NEXT_PUBLIC_CONN_DETAILS_ENDPOINT="/api/connection-details"

# --- Server-Side Variables for the /api/connection-details route ---
# These are used by the Next.js API route to generate a token for the user.
# In a production environment, you would have a separate, secure backend for this.

# Your LiveKit server URL, e.g., https://my-project.livekit.cloud
LIVEKIT_URL="YOUR_LIVEKIT_URL"

# Your LiveKit API Key and Secret
LIVEKIT_API_KEY="YOUR_LIVEKIT_API_KEY"
LIVEKIT_API_SECRET="YOUR_LIVEKIT_API_SECRET"
```

Explanation:
- NEXT_PUBLIC_CONN_DETAILS_ENDPOINT: Frontend endpoint used to request LiveKit connection info (room name, access token, etc.). The sample frontend includes a Next.js API route that can generate tokens for local testing.
- LIVEKIT_URL: The LiveKit Cloud URL (or self-hosted LiveKit endpoint).
- LIVEKIT_API_KEY / LIVEKIT_API_SECRET: Server-side credentials used by the token-generation API route to create short-lived LiveKit tokens. Keep these secret and do not commit them to source control.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open the application:

- The app will be available at http://localhost:3000 by default. Click "Start Call" to request a token and join the LiveKit room where the deployed agent is also present.

---

## How It Works (High-level Flow)

1. User opens the web UI and clicks "Start Call".
2. Frontend requests connection details (LiveKit token) from the configured `/api/connection-details` endpoint.
3. The token-generation route (Next.js API) uses the LiveKit server credentials to mint a short-lived token that allows the user to join a room. The room is configured such that the deployed Python agent joins automatically.
4. The user and the LiveKit agent join the same LiveKit room. Live audio flows between them.
5. The agent receives audio, processes STT via Deepgram, sends transcripts + context to Azure OpenAI to determine intent and next actions, and uses TTS (Deepgram or another provider) to speak. If a ticket must be created, the agent calls the SMTP tool to send a formatted email to IT.
6. The frontend displays the agent's avatar/video (Beyond Presence if enabled), live transcript, and any ticket details returned by the backend.

---

## Customization

To adapt agent behavior, modify the backend agent code:

- Path: `IT_backend_python/agent.py` (or the backend directory containing the Python LiveKit agent)
  - Update the main system prompt (e.g., `helpdesk_instructions`) to adjust tone, policies, and scope.
  - Add, remove, or modify tool functions (troubleshooting tools or the SMTP ticket tool).
  - Swap or configure providers for LLM, STT, or TTS (Azure OpenAI / Deepgram / others).
  - Adjust thresholds, confidence heuristics, or logging of conversations.

If you need to change frontend behavior:
- Update Next.js pages/components in `IT-helpdesk-ui/my-livekit-agent-frontend`.
- Edit UI copy, theme (Tailwind), or transcript display components.

---

## Running End-to-End Locally (Optional)

If you want a full local experience (frontend + local agent):
1. Ensure you have credentials for Azure OpenAI and Deepgram configured for the local agent backend.
2. Run the Python LiveKit agent locally (requires `livekit-agents` SDK and dependencies).
3. Point your frontend's `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT` to your local token-generation API or to a local proxy that mints tokens using your LiveKit credentials.
4. Start frontend and agent; then join a session from the frontend.

---

## Security & Privacy

- Do not commit `.env.local` or any secrets to the repository.
- Ensure transcripts and logs are access-controlled; redact sensitive information (passwords, tokens) from logs.
- For production, host token-generation in a secure server (not client-side) and enforce short-lived tokens and room permissions.

---

## Contributing

Contributions are welcome! Suggested workflow:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/awesome-improvement`
3. Add tests where relevant and update docs.
4. Open a Pull Request describing your change.

Please follow the repository’s coding style and add clear PR descriptions.

---

## License

This project is available under the MIT License. Add a LICENSE file to the repo if missing.

---

If you'd like, I can:
- Commit this README to the repository for you (I can prepare a commit message and update the file).
- Or, if you prefer, I can generate a small `.env.example` or a token-generation example route for the Next.js frontend to make getting started even smoother.

What would you like me to do next?
