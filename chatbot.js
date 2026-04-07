// Jarvex Chatbot - Complete Redesign
const chatbotData = {
  greetings: [
    "Hey, I'm Jarvex! 👋 Need help with our services?",
    "Hi there! What can I help you with today?",
    "Welcome! Ask me anything about Jarvex 🚀"
  ],
  
  keywords: {
    website: {
      terms: ["website", "web design", "hosting", "seo", "web", "design", "domain", "wordpress", "webdev"],
      response: "💻 **Website Design & Hosting**\n\nWe craft high-performing websites that convert.\n\n✓ Mobile-first & responsive\n✓ SSL, CDN & 99.9% uptime\n✓ SEO-optimized from day one\n✓ Fast loading speeds\n✓ CMS or custom development\n\nReady to build? 🚀"
    },
    ads: {
      terms: ["ads", "advertising", "google", "facebook", "meta", "instagram", "campaign", "marketing", "facebook ads", "google ads"],
      response: "📢 **Google & Meta Ads**\n\nData-driven campaigns that maximize ROI.\n\n✓ Google Search, Display & YouTube\n✓ Facebook & Instagram ads\n✓ Advanced targeting & retargeting\n✓ A/B testing & optimization\n✓ Weekly performance reports\n\nLet's grow your business 📈"
    },
    apps: {
      terms: ["app", "mobile", "ios", "android", "flutter", "react native", "pwa", "app development"],
      response: "📱 **App Development**\n\nFrom MVP to production-ready apps.\n\n✓ iOS, Android & Cross-platform\n✓ Flutter, React Native & PWA\n✓ API design & backend setup\n✓ App store submissions\n✓ Post-launch support\n\nLet's build something great 🎯"
    },
    ai: {
      terms: ["ai", "artificial intelligence", "chatbot", "automation", "machine learning", "gpt", "claude", "llm"],
      response: "🤖 **AI Integrations**\n\nIntelligence meets your business.\n\n✓ GPT & Claude-powered chatbots\n✓ Automation workflows\n✓ AI-assisted features\n✓ Custom LLM fine-tuning\n\nReady to innovate? 🚀"
    },
    process: {
      terms: ["process", "how", "workflow", "steps", "approach"],
      response: "🔄 **Our Process**\n\n**4 transparent steps:**\n\n1️⃣ **Discovery** → Understanding your goals\n2️⃣ **Strategy** → Planning the solution\n3️⃣ **Build** → Executing with precision\n4️⃣ **Optimize** → Continuous improvement\n\nYou're in control at every step 🎯"
    },
    pricing: {
      terms: ["price", "cost", "pricing", "plan", "budget", "payment", "plans"],
      response: "💰 **Pricing Plans**\n\n**Three flexible options:**\n\n🚀 **Starter** → Perfect for beginners\n📈 **Growth** → Scale your business\n⭐ **Scale** → Enterprise solutions\n\n✓ No hidden fees\n✓ No lock-ins\n✓ Custom quotes available\n\nLet's find your perfect fit 👌"
    },
    team: {
      terms: ["team", "who", "founder", "company", "about"],
      response: "👥 **About Jarvex**\n\nWe're a **growth engine**, not just an agency.\n\n✓ Outcome-focused team\n✓ Quality over quantity\n✓ Long-term partnerships\n✓ Transparent & communicative\n✓ Based in India 🇮🇳\n\nLet's build together 💪"
    },
    contact: {
      terms: ["contact", "email", "call", "phone", "reach", "connect"],
      response: "📞 **Get In Touch**\n\n📧 **Email:** info@jarvex.in\n🔗 **Website:** www.jarvex.in\n📝 **Contact Form:** Check our site\n🗓️ **Book a Call:** Let's chat!\n\nReady to start? We're waiting! 🎉"
    },
    timeline: {
      terms: ["timeline", "how long", "duration", "when", "schedule"],
      response: "⏱️ **Project Timeline**\n\nDepends on scope:\n\n🌐 **Websites:** 4-8 weeks\n📱 **Apps:** 8-16 weeks\n📢 **Ad Campaigns:** Immediate setup\n🤖 **AI Solutions:** 2-6 weeks\n\nLet's discuss your needs! 🚀"
    },
    support: {
      terms: ["support", "maintenance", "after launch", "ongoing"],
      response: "🛡️ **Launch & Beyond**\n\nWe don't disappear after launch.\n\n✓ Post-launch support included\n✓ Maintenance & monitoring\n✓ Performance optimization\n✓ Regular updates\n✓ Your success is our success\n\nLet's grow long-term 🌱"
    }
  },
  
  faq: [
    "What do you do?",
    "How much does it cost?",
    "How long does a project take?",
    "Do you offer support after launch?",
    "Can you help with SEO?",
    "Do you work with startups?"
  ]
};

class JarvexChatbot {
  constructor() {
    this.isOpen = false;
    this.hasGreeted = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open Jarvex Chat">
        <svg class="chatbot-logo" viewBox="-52 -52 104 104" xmlns="http://www.w3.org/2000/svg">
          <circle r="48" fill="none" stroke="#080808" stroke-width="0.8" opacity="0.7"/>
          <g class="kc-outer">
            <polygon points="0,-48 2,-38 -2,-38" fill="#080808" opacity="0.95"/>
            <polygon points="24,-41.6 21.5,-32 17.5,-35" fill="#080808" opacity="0.85"/>
            <polygon points="41.6,-24 35,-17.5 32,-21.5" fill="#0d0d00" opacity="0.9"/>
            <polygon points="48,0 38,2 38,-2" fill="#080808" opacity="0.95"/>
            <polygon points="41.6,24 32,21.5 35,17.5" fill="#0d0d00" opacity="0.9"/>
            <polygon points="24,41.6 17.5,35 21.5,32" fill="#080808" opacity="0.85"/>
            <polygon points="0,48 -2,38 2,38" fill="#080808" opacity="0.95"/>
            <polygon points="-24,41.6 -21.5,32 -17.5,35" fill="#080808" opacity="0.85"/>
            <polygon points="-41.6,24 -35,17.5 -32,21.5" fill="#0d0d00" opacity="0.9"/>
            <polygon points="-48,0 -38,-2 -38,2" fill="#080808" opacity="0.95"/>
            <polygon points="-41.6,-24 -32,-21.5 -35,-17.5" fill="#0d0d00" opacity="0.9"/>
            <polygon points="-24,-41.6 -17.5,-35 -21.5,-32" fill="#080808" opacity="0.85"/>
          </g>
          <circle r="36" fill="none" stroke="#080808" stroke-width="1" opacity="0.5"/>
          <g class="kc-middle">
            <circle cx="0" cy="-36" r="2" fill="#080808"/>
            <circle cx="18" cy="-31.2" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="31.2" cy="-18" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="36" cy="0" r="2" fill="#080808"/>
            <circle cx="31.2" cy="18" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="18" cy="31.2" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="0" cy="36" r="2" fill="#080808"/>
            <circle cx="-18" cy="31.2" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="-31.2" cy="18" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="-36" cy="0" r="2" fill="#080808"/>
            <circle cx="-31.2" cy="-18" r="1.5" fill="#0d0d00" opacity="0.9"/>
            <circle cx="-18" cy="-31.2" r="1.5" fill="#0d0d00" opacity="0.9"/>
          </g>
          <circle r="22" fill="#080808" stroke="#0d0d00" stroke-width="0.8"/>
          <g class="kc-inner">
            <polygon points="0,-22 1.5,-14 -1.5,-14" fill="#e8ff47" opacity="0.95"/>
            <polygon points="19.1,-11 13,-7 11,-10" fill="#e8ff47" opacity="0.85"/>
            <polygon points="19.1,11 11,10 13,7" fill="#e8ff47" opacity="0.85"/>
            <polygon points="0,22 -1.5,14 1.5,14" fill="#e8ff47" opacity="0.95"/>
            <polygon points="-19.1,11 -13,7 -11,10" fill="#e8ff47" opacity="0.85"/>
            <polygon points="-19.1,-11 -11,-10 -13,-7" fill="#e8ff47" opacity="0.85"/>
          </g>
          <circle r="10" fill="#e8ff47"/>
          <circle r="6" fill="#080808"/>
          <circle r="3" fill="#e8ff47" class="kc-center-dot"/>
          <circle r="1.2" fill="#080808"/>
        </svg>
      </button>

      <div id="jarvex-chatbot" class="jarvex-chatbot">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-title">
            <svg class="chatbot-header-logo" viewBox="-52 -52 104 104" xmlns="http://www.w3.org/2000/svg">
              <circle r="48" fill="none" stroke="#e8ff47" stroke-width="0.5" opacity="0.55"/>
              <g class="kc-outer">
                <polygon points="0,-48 2,-38 -2,-38" fill="#e8ff47" opacity="0.95"/>
                <polygon points="24,-41.6 21.5,-32 17.5,-35" fill="#e8ff47" opacity="0.85"/>
                <polygon points="41.6,-24 35,-17.5 32,-21.5" fill="#c8e800" opacity="0.78"/>
                <polygon points="48,0 38,2 38,-2" fill="#e8ff47" opacity="0.95"/>
                <polygon points="41.6,24 32,21.5 35,17.5" fill="#c8e800" opacity="0.78"/>
                <polygon points="24,41.6 17.5,35 21.5,32" fill="#e8ff47" opacity="0.85"/>
                <polygon points="0,48 -2,38 2,38" fill="#e8ff47" opacity="0.95"/>
                <polygon points="-24,41.6 -21.5,32 -17.5,35" fill="#e8ff47" opacity="0.85"/>
                <polygon points="-41.6,24 -35,17.5 -32,21.5" fill="#c8e800" opacity="0.78"/>
                <polygon points="-48,0 -38,-2 -38,2" fill="#e8ff47" opacity="0.95"/>
                <polygon points="-41.6,-24 -32,-21.5 -35,-17.5" fill="#c8e800" opacity="0.78"/>
                <polygon points="-24,-41.6 -17.5,-35 -21.5,-32" fill="#e8ff47" opacity="0.85"/>
              </g>
              <circle r="36" fill="none" stroke="#e8ff47" stroke-width="0.6" opacity="0.4"/>
              <g class="kc-middle">
                <circle cx="0" cy="-36" r="2" fill="#e8ff47"/>
                <circle cx="18" cy="-31.2" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="31.2" cy="-18" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="36" cy="0" r="2" fill="#e8ff47"/>
                <circle cx="31.2" cy="18" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="18" cy="31.2" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="0" cy="36" r="2" fill="#e8ff47"/>
                <circle cx="-18" cy="31.2" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="-31.2" cy="18" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="-36" cy="0" r="2" fill="#e8ff47"/>
                <circle cx="-31.2" cy="-18" r="1.5" fill="#c8e800" opacity="0.8"/>
                <circle cx="-18" cy="-31.2" r="1.5" fill="#c8e800" opacity="0.8"/>
              </g>
              <circle r="22" fill="#0d0d00" stroke="#e8ff47" stroke-width="0.8"/>
              <g class="kc-inner">
                <polygon points="0,-22 1.5,-14 -1.5,-14" fill="#7fa800" opacity="0.9"/>
                <polygon points="19.1,-11 13,-7 11,-10" fill="#7fa800" opacity="0.8"/>
                <polygon points="19.1,11 11,10 13,7" fill="#7fa800" opacity="0.8"/>
                <polygon points="0,22 -1.5,14 1.5,14" fill="#7fa800" opacity="0.9"/>
                <polygon points="-19.1,11 -13,7 -11,10" fill="#7fa800" opacity="0.8"/>
                <polygon points="-19.1,-11 -11,-10 -13,-7" fill="#7fa800" opacity="0.8"/>
              </g>
              <circle r="10" fill="#e8ff47"/>
              <circle r="6" fill="#080808"/>
              <circle r="3" fill="#e8ff47" class="kc-center-dot"/>
              <circle r="1.2" fill="#080808"/>
            </svg>
            <span>Jarvex</span>
          </div>
          <button id="chatbot-minimize" class="chatbot-minimize" aria-label="Minimize">−</button>
        </div>

        <!-- Messages -->
        <div id="chatbot-messages" class="chatbot-messages"></div>

        <!-- Quick Actions -->
        <div class="chatbot-actions">
          <button class="action-btn" data-action="website">💻 Website</button>
          <button class="action-btn" data-action="ads">📢 Ads</button>
          <button class="action-btn" data-action="apps">📱 Apps</button>
          <button class="action-btn" data-action="ai">🤖 AI</button>
        </div>

        <!-- Input -->
        <div class="chatbot-footer">
          <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type a question..." autocomplete="off"/>
          <button id="chatbot-submit" class="chatbot-submit" aria-label="Send">→</button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const minimize = document.getElementById('chatbot-minimize');
    const submit = document.getElementById('chatbot-submit');
    const input = document.getElementById('chatbot-input');
    const actions = document.querySelectorAll('.action-btn');

    toggle?.addEventListener('click', () => this.openChat());
    minimize?.addEventListener('click', () => this.closeChat());
    submit?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keypress', (e) => e.key === 'Enter' && this.sendMessage());
    
    actions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleAction(action);
      });
    });
  }

  openChat() {
    this.isOpen = true;
    const chatbot = document.getElementById('jarvex-chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    chatbot?.classList.add('open');
    toggle?.classList.add('hidden');
    document.getElementById('chatbot-input')?.focus();
    if (!this.hasGreeted) {
      this.hasGreeted = true;
      this.showGreeting();
    }
  }

  closeChat() {
    this.isOpen = false;
    const chatbot = document.getElementById('jarvex-chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    chatbot?.classList.remove('open');
    toggle?.classList.remove('hidden');
  }

  showGreeting() {
    const greeting = chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)];
    this.displayBotMessage(greeting);
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    this.displayUserMessage(message);
    input.value = '';
    
    // Simulate typing
    setTimeout(() => {
      const response = this.getResponse(message);
      this.displayBotMessage(response);
    }, 600);
  }

  handleAction(action) {
    const keywords = chatbotData.keywords[action];
    if (keywords) {
      this.displayUserMessage(`Tell me about ${action}`);
      setTimeout(() => {
        this.displayBotMessage(keywords.response);
      }, 600);
    }
  }

  getResponse(message) {
    const msg = message.toLowerCase();
    
    // Check all keyword categories
    for (const [key, data] of Object.entries(chatbotData.keywords)) {
      if (data.terms.some(term => msg.includes(term))) {
        return data.response;
      }
    }
    
    // Check for specific common phrases
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('start')) {
      return "Hey! 👋 What brings you here today? You can ask about:\n\n• Website Design\n• Google & Meta Ads\n• App Development\n• AI Solutions\n\nOr just type your question! 🚀";
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! 😊 Anything else I can help with? 👍";
    }
    
    if (msg.includes('no') || msg.includes('nope')) {
      return "All good! Let me know if you need anything else 👌";
    }
    
    // Default fallback
    return "Great question! 🤔\n\nI'd love to help, but I'm not quite sure about that one. Try asking about:\n\n💻 Website Design\n📢 Google & Meta Ads\n📱 App Development\n🤖 AI Solutions\n\nOr visit our website for more info! 🚀";
  }

  displayUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message user-msg';
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  displayBotMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message bot-msg';
    
    // Escape HTML entities first, then apply safe markdown-like formatting
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const formattedText = escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?:^|\n)([🚀📈🎯💪🌱🎉👌👍😊🤔📱💻📢🤖⏱️🛡️📞🔗📧🗓️🔄1️⃣2️⃣3️⃣4️⃣✓].*?)(?=\n|$)/g, '<div class="bot-item">$1</div>');
    
    msgDiv.innerHTML = formattedText;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Initialize after page is fully loaded — don't block first paint
function initChatbot(){new JarvexChatbot()}
if(document.readyState==='complete'){setTimeout(initChatbot,1000)}
else{window.addEventListener('load',function(){setTimeout(initChatbot,1000)})}
