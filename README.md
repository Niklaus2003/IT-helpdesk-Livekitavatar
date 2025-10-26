<h1>🧠 AI IT Helpdesk Agent</h1>

<p>
A <b>voice-first AI assistant</b> that automates and streamlines internal IT support using <b>LiveKit</b>, <b>Deepgram</b>, and <b>Azure OpenAI</b>.  
Employees can interact naturally with the agent through a <b>modern web interface</b> (voice + optional text).  
The agent runs in the cloud, providing real-time assistance, and can even <b>raise support tickets automatically</b> when required.
</p>

<hr>

<h2>🚀 Live Demo</h2>
<p>
🔗 <a href="https://it-helpdesk-agent.netlify.app" target="_blank">Live Demo</a>  
</p>

<hr>

<h2>💡 Introduction</h2>
<p>
The <b>AI IT Helpdesk Agent</b> simplifies how employees resolve technical issues.  
It listens, understands, and responds with intelligent troubleshooting steps for problems like:
</p>
<ul>
  <li>Password resets and account unlocks</li>
  <li>Network and Wi-Fi connectivity issues</li>
  <li>Email configuration and sync problems</li>
  <li>Printer setup and diagnostics</li>
  <li>Hardware or VPN troubleshooting</li>
</ul>

<p>
If the issue cannot be fixed, the agent automatically composes and sends an email ticket to the IT department for follow-up — making IT support faster and more human.
</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li>🎤 <b>Voice-First Interaction:</b> Natural, real-time conversations using Deepgram STT and TTS.</li>
  <li>🤖 <b>AI-Powered Troubleshooting:</b> Uses Azure OpenAI for intelligent reasoning and guidance.</li>
  <li>📧 <b>Automated Ticket Creation:</b> Sends formatted support tickets directly to IT when escalation is needed.</li>
  <li>🧍‍♂️ <b>Optional 3D Avatar:</b> Integrates Beyond Presence for a realistic, expressive AI assistant.</li>
  <li>💻 <b>Web Interface:</b> Built with Next.js + Tailwind CSS featuring live transcription, light/dark themes, and audio control.</li>
  <li>☁️ <b>Cloud-Native Agent:</b> Hosted on LiveKit Cloud for low-latency voice communication and smooth orchestration.</li>
</ul>

<hr>

<h2>🧰 Tech Stack</h2>
<ul>
  <li><b>Frontend:</b> Next.js 14, React, TypeScript, Tailwind CSS</li>
  <li><b>Backend (Deployed Separately):</b> Python LiveKit Agent using Azure OpenAI, Deepgram, and SMTP ticketing</li>
  <li><b>Services:</b> LiveKit Cloud, Deepgram STT/TTS, Azure OpenAI, Beyond Presence (optional 3D avatar)</li>
</ul>

<hr>

<h2>⚙️ Getting Started</h2>

<p>To set up and run the frontend locally:</p>

<ol>
  <li>
    <b>Clone the repository:</b>
    <pre><code>git clone https://github.com/Niklaus2003/IT-helpdesk-Livekitavatar.git
cd IT-helpdesk-Livekitavatar</code></pre>
  </li>

  <li>
    <b>Install dependencies:</b>
    <pre><code>npm install
# or
yarn install</code></pre>
  </li>

  <li>
    <b>Create environment file:</b>  
    Inside the project folder, create a <code>.env.local</code> file with the following:
    <pre><code># Endpoint for fetching LiveKit token and room info
NEXT_PUBLIC_CONN_DETAILS_ENDPOINT="/api/connection-details"

# LiveKit Cloud credentials (server-side use only)
LIVEKIT_URL="YOUR_LIVEKIT_URL"
LIVEKIT_API_KEY="YOUR_LIVEKIT_API_KEY"
LIVEKIT_API_SECRET="YOUR_LIVEKIT_API_SECRET"</code></pre>
  </li>

  <li>
    <b>Run the development server:</b>
    <pre><code>npm run dev
# or
yarn dev</code></pre>
  </li>

  <li>
    <b>Open in browser:</b>  
    Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> and click <b>“Start Call”</b> to join the LiveKit room and interact with the AI agent.
  </li>
</ol>

<hr>

<h2>🧩 How It Works</h2>
<ol>
  <li>User opens the web app and clicks <b>Start Call</b>.</li>
  <li>The frontend fetches a short-lived LiveKit token via the configured API endpoint.</li>
  <li>Both user and cloud agent join the same LiveKit room.</li>
  <li>Audio is streamed in real-time — Deepgram handles STT and TTS.</li>
  <li>Azure OpenAI performs reasoning and guides troubleshooting.</li>
  <li>If unresolved, the agent automatically emails IT support via SMTP ticket creation.</li>
  <li>Frontend displays transcript, live response, and optional avatar animation.</li>
</ol>

<hr>

<h2>🔧 Customization</h2>
<ul>
  <li>Change the UI design in <code>/components</code> and <code>/pages</code> using Tailwind CSS.</li>
  <li>Modify token request behavior in <code>/api/connection-details</code> to point to your backend token service.</li>
  <li>Connect to your own LiveKit Cloud project by updating <code>.env.local</code>.</li>
</ul>

<hr>

<h2>🔒 Security & Privacy</h2>
<ul>
  <li>Never commit your <code>.env.local</code> file or API secrets to GitHub.</li>
  <li>Use short-lived tokens for user sessions.</li>
  <li>Host your token-generation logic securely (outside client-side code).</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>
Contributions are welcome!  
Fork this repo, create a new branch, and submit a pull request with a clear description of your changes.
</p>

<pre><code>git checkout -b feat/new-feature
git commit -m "Added new feature"
git push origin feat/new-feature</code></pre>

<hr>

<h2>📄 License</h2>
<p>This project is licensed under the <b>MIT License</b>.</p>

<hr>

<h2>🌟 Future Enhancements</h2>
<ul>
  <li>🎧 Add multi-language voice support for global teams</li>
  <li>📊 Integrate IT ticket dashboards for real-time tracking</li>
  <li>💬 Expand agent capabilities to HR and Admin queries</li>
  <li>📱 Add mobile optimization for quick access on-the-go</li>
  <li>🧠 Integrate memory for context-aware follow-up queries</li>
</ul>

<p>
Made with ❤️ using <b>Next.js</b>, <b>LiveKit</b>, and <b>Azure OpenAI</b>.
</p>
