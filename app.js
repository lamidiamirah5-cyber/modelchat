const agents = [
  {
    id: "research",
    name: "Research AI",
    short: "Finds patterns and explains clearly",
    icon: "R",
    color: "#315f97",
    description: "Good for studying topics, comparing options, summarizing long ideas, and turning messy notes into clear answers.",
    capabilities: ["Deep explanations", "Source planning", "Study help", "Comparisons"],
    starter: "Give me a smart overview of this topic:"
  },
  {
    id: "creative",
    name: "Creative AI",
    short: "Brainstorms names, stories, and ideas",
    icon: "C",
    color: "#b54d65",
    description: "Good for writing, worldbuilding, app concepts, names, scripts, and getting unstuck when the page feels too blank.",
    capabilities: ["Idea generation", "Tone rewrites", "Stories", "Brand names"],
    starter: "Help me brainstorm a fresh idea for:"
  },
  {
    id: "code",
    name: "Code AI",
    short: "Helps build and debug software",
    icon: "</>",
    color: "#19796b",
    description: "Good for app architecture, debugging errors, writing features, explaining code, and turning product ideas into working screens.",
    capabilities: ["Debugging", "App planning", "Code review", "Feature builds"],
    starter: "Help me build this feature:"
  },
  {
    id: "coach",
    name: "Coach AI",
    short: "Plans habits, goals, and decisions",
    icon: "G",
    color: "#c77b28",
    description: "Good for breaking a goal into next steps, staying focused, practicing conversations, and deciding what matters first.",
    capabilities: ["Goal plans", "Decision help", "Checklists", "Reflection"],
    starter: "Help me make a simple plan for:"
  }
];

const providers = {
  Mode: ["Smart", "Mixed", "Fast", "Creative", "Reasoning"],
  OpenAI: ["GPT-5.2", "GPT-5.2 pro", "GPT-5 mini", "GPT-5 nano"],
  Anthropic: ["Claude Opus 4.5", "Claude Sonnet 4.5", "Claude Haiku 4.5"],
  xAI: ["Grok 4.20", "Grok 4.20 Multi-Agent", "Grok 4.3", "Grok Build 0.1"],
  Google: ["Gemini 3 Pro Preview", "Gemini 3 Flash Preview", "Gemini 2.5 Flash"],
  DeepSeek: ["DeepSeek V3.2", "DeepSeek Chat", "DeepSeek Reasoner"],
  Meta: ["Llama 4", "Llama 3.3", "Llama 3.1"],
  Mistral: ["Mistral Medium 3", "Mistral Large 2.1", "Codestral", "Devstral"],
  Perplexity: ["Sonar Pro", "Sonar Reasoning Pro", "Sonar Deep Research"],
  Local: ["Llama 4", "Mistral Local"]
};

const latestModels = [
  {
    provider: "Mixed",
    model: "All models together",
    selectProvider: "Mode",
    selectModel: "Mixed",
    note: "Routes the prompt across Smart, Creative, Code, and Research styles, then blends the answer into one response."
  },
  {
    provider: "Smart",
    model: "Best auto choice",
    selectProvider: "Mode",
    selectModel: "Smart",
    note: "Picks a strong general model for the question. This is the default, like the Smart button in Copilot."
  },
  {
    provider: "OpenAI",
    model: "GPT-5.2",
    selectProvider: "OpenAI",
    selectModel: "GPT-5.2",
    note: "Frontier general model for coding, reasoning, and agentic tasks. Try GPT-5 mini or nano when speed and cost matter."
  },
  {
    provider: "Anthropic",
    model: "Claude Opus 4.5",
    selectProvider: "Anthropic",
    selectModel: "Claude Opus 4.5",
    note: "Claude's high-end option for difficult coding, writing, and analysis. Sonnet is the balanced pick, and Haiku is faster."
  },
  {
    provider: "xAI",
    model: "Grok 4.20",
    selectProvider: "xAI",
    selectModel: "Grok 4.20",
    note: "Grok's newest flagship family for fast answers, tool calling, and reasoning-style work."
  },
  {
    provider: "Google",
    model: "Gemini 3 Pro Preview",
    selectProvider: "Google",
    selectModel: "Gemini 3 Pro Preview",
    note: "Google's high-end multimodal model. Gemini 3 Flash Preview is the faster balanced option."
  },
  {
    provider: "DeepSeek",
    model: "DeepSeek V3.2",
    selectProvider: "DeepSeek",
    selectModel: "DeepSeek V3.2",
    note: "A strong value model family for chat, coding, and reasoning-style prompts."
  },
  {
    provider: "Meta",
    model: "Llama 4",
    selectProvider: "Meta",
    selectModel: "Llama 4",
    note: "Open model family option for apps that want local, hosted, or customizable deployments."
  },
  {
    provider: "Mistral",
    model: "Mistral Medium 3",
    selectProvider: "Mistral",
    selectModel: "Mistral Medium 3",
    note: "Mistral's frontier-class option, with Codestral and Devstral choices for coding workflows."
  },
  {
    provider: "Perplexity",
    model: "Sonar Pro",
    selectProvider: "Perplexity",
    selectModel: "Sonar Pro",
    note: "Search-focused model family for web-grounded answers and research workflows."
  }
];

let activeAgent = agents[0];
let activeMode = "balanced";

const agentList = document.querySelector("#agentList");
const activeAgentName = document.querySelector("#activeAgentName");
const agentDescription = document.querySelector("#agentDescription");
const capabilityGrid = document.querySelector("#capabilityGrid");
const providerSelect = document.querySelector("#providerSelect");
const modelSelect = document.querySelector("#modelSelect");
const messages = document.querySelector("#messages");
const welcome = document.querySelector("#welcome");
const form = document.querySelector("#chatForm");
const promptInput = document.querySelector("#promptInput");
const modelStatus = document.querySelector("#modelStatus");
const modelBar = document.querySelector("#modelBar");
const modelBarTitle = document.querySelector("#modelBarTitle");
const modelSheet = document.querySelector("#modelSheet");
const latestModelsContainer = document.querySelector("#latestModels");

function renderAgents() {
  if (!agentList) return;
  agentList.innerHTML = agents
    .map(
      (agent) => `
        <button class="agent-card ${agent.id === activeAgent.id ? "active" : ""}" data-agent="${agent.id}">
          <span class="agent-icon" style="background:${agent.color}">${agent.icon}</span>
          <span>
            <strong>${agent.name}</strong>
            <span>${agent.short}</span>
          </span>
        </button>
      `
    )
    .join("");
}

function renderAgentDetails() {
  activeAgentName.textContent = "New chat";
  if (agentDescription) agentDescription.textContent = activeAgent.description;
  if (capabilityGrid) {
    capabilityGrid.innerHTML = activeAgent.capabilities
      .map((capability) => `<div class="capability">${capability}</div>`)
      .join("");
  }
}

function renderProviders() {
  providerSelect.innerHTML = Object.keys(providers)
    .map((provider) => `<option value="${provider}">${provider}</option>`)
    .join("");
  renderModels();
}

function renderModels() {
  const selectedProvider = providerSelect.value;
  modelSelect.innerHTML = providers[selectedProvider]
    .map((model) => `<option value="${model}">${model}</option>`)
    .join("");
  updateStatus();
}

function updateStatus() {
  const label = providerSelect.value === "Mode" ? modelSelect.value : `${providerSelect.value} ${modelSelect.value}`;
  modelStatus.textContent = `${label} selected - demo responses active`;
  modelBarTitle.textContent = modelSelect.value;
}

function renderLatestModels() {
  latestModelsContainer.innerHTML = latestModels
    .map(
      (item) => `
        <button class="latest-card" type="button" data-provider="${item.selectProvider}" data-model="${item.selectModel}">
          <strong>${item.provider}</strong>
          <span>${item.model}</span>
          <small>${item.note}</small>
        </button>
      `
    )
    .join("");
}

function addMessage(role, text, meta) {
  welcome.classList.add("conversation-started");
  const article = document.createElement("article");
  article.className = `message ${role}`;
  article.innerHTML = `<span class="message-meta">${meta}</span>${text}`;
  messages.appendChild(article);
  messages.scrollTop = messages.scrollHeight;
}

function buildReply(prompt) {
  const model = modelSelect.value;
  const provider = providerSelect.value;
  const modeLine = {
    balanced: "I will keep this balanced: useful, clear, and not too long.",
    creative: "I will lean more imaginative and give you a few directions to play with.",
    precise: "I will be direct and structured, focusing on the key answer."
  }[activeMode];

  const agentLine = {
    research: "First, I would define the topic, identify what matters, then compare the strongest options.",
    creative: "First, I would open up several possibilities, then refine the one with the most spark.",
    code: "First, I would turn the idea into screens, data, and actions, then build the smallest working version.",
    coach: "First, I would choose the next doable step, then set a simple rhythm so progress is easy to repeat."
  }[activeAgent.id];

  return `${modeLine}<br><br>${agentLine}<br><br><strong>Using ${provider} ${model}</strong>, here is how I would respond to: "${escapeHtml(prompt)}"`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char];
  });
}

if (agentList) {
  agentList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-agent]");
    if (!card) return;
    activeAgent = agents.find((agent) => agent.id === card.dataset.agent);
    renderAgents();
    renderAgentDetails();
    addMessage("ai", `Switched to ${activeAgent.name}. ${activeAgent.short}.`, `${activeAgent.name}`);
  });
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    activeMode = button.dataset.mode;
  });
});

providerSelect.addEventListener("change", renderModels);
modelSelect.addEventListener("change", updateStatus);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;
  addMessage("user", escapeHtml(prompt), "You");
  promptInput.value = "";
  promptInput.style.height = "auto";

  window.setTimeout(() => {
    addMessage("ai", buildReply(prompt), `${activeAgent.name} - ${modelSelect.value}`);
  }, 450);
});

promptInput.addEventListener("input", () => {
  promptInput.style.height = "auto";
  promptInput.style.height = `${promptInput.scrollHeight}px`;
});

document.querySelector("#promptIdeas").addEventListener("click", () => {
  promptInput.value = activeAgent.starter + " ";
  promptInput.focus();
  promptInput.dispatchEvent(new Event("input"));
});

document.querySelectorAll("[data-idea]").forEach((button) => {
  button.addEventListener("click", () => {
    promptInput.value = button.dataset.idea;
    promptInput.focus();
    promptInput.dispatchEvent(new Event("input"));
  });
});

modelBar.addEventListener("click", () => {
  if (typeof modelSheet.showModal === "function") {
    modelSheet.showModal();
  } else {
    modelSheet.setAttribute("open", "");
  }
});

document.querySelector("#closeModelSheet").addEventListener("click", () => {
  modelSheet.close();
});

latestModelsContainer.addEventListener("click", (event) => {
  const card = event.target.closest("[data-provider][data-model]");
  if (!card) return;
  providerSelect.value = card.dataset.provider;
  renderModels();
  modelSelect.value = card.dataset.model;
  updateStatus();
  modelSheet.close();
});

document.querySelector("#clearChat").addEventListener("click", () => {
  messages.querySelectorAll(".message").forEach((message) => message.remove());
  welcome.classList.remove("conversation-started");
});

renderProviders();
renderLatestModels();
renderAgents();
renderAgentDetails();
