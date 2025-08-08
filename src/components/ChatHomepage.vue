<template>
    <div class="chat-homepage">
        <!-- Animated RICK Hero Text -->
        <div class="hero-text">
            <div class="rick-text">
                RICK
            </div>
            <div class="tooltip-box">
                <div class="tooltip">
                    <span class="triangle"></span>
                    AI assistent
                </div>
            </div>
        </div>

        <div class="ai-chat-wrapper">
            <div class="ai-chat-container" id="chat" ref="chatContainer">
                <!-- Welcome message with navigation bubbles -->
                <div class="ai-chat-message ai-chat-bot">
                    <div class="welcome-text">
                        Hallo! Ik ben Rick's AI assistent. Ik kan je helpen navigeren door Ricks portfolio en vragen
                        beantwoorden over Ricks werk.
                    </div>
                    <div class="ai-chat-suggestions">
                        <router-link to="/about" class="ai-chat-suggestion-bubble">
                            📋 Over Rick
                        </router-link>
                        <router-link to="/projects" class="ai-chat-suggestion-bubble">
                            💼 Projecten
                        </router-link>
                        <button @click="askAboutSkills" class="ai-chat-suggestion-bubble">
                            🛠️ Vaardigheden
                        </button>
                        <button @click="askAboutContact" class="ai-chat-suggestion-bubble">
                            📞 Contact
                        </button>
                        <button @click="askAboutExperience" class="ai-chat-suggestion-bubble">
                            💡 Ervaring
                        </button>
                    </div>
                </div>

                <!-- Dynamic messages will be added here -->
                <div v-for="message in messages" :key="message.id" :class="['ai-chat-message', message.type]">
                    <div v-if="message.isTyping" class="ai-chat-loader"></div>
                    <div v-else>
                        {{ message.text }}
                        <div v-if="message.suggestions" class="ai-chat-suggestions">
                            <router-link v-for="suggestion in message.suggestions" :key="suggestion.title"
                                :to="suggestion.url" class="ai-chat-suggestion-bubble">
                                {{ suggestion.title }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ai-chat-input-wrapper">
                <input class="ai-chat-input" type="text" v-model="userInput" @keypress.enter="sendMessage"
                    placeholder="Stel een vraag over Ricks portfolio..." />
                <button class="ai-chat-submit" @click="sendMessage">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const chatContainer = ref(null)
const userInput = ref('')
const messages = ref([])
let messageId = 0

// Portfolio data for responses
const portfolioData = {
    skills: ['Vue.js', 'Laravel', 'JavaScript', 'PHP', 'HTML/CSS', 'MySQL', 'Git', 'Responsive Design'],
    experience: [
        'Frontend ontwikkeling met Vue.js en modern JavaScript',
        'Backend ontwikkeling met Laravel en PHP',
        'Responsive web design en UI/UX',
        'Database design en optimalisatie',
        'API ontwikkeling en integratie'
    ],
    contact: {
        email: 'rickvanoirschot@gmail.com',
        linkedin: 'linkedin.com/in/rickvanoirschot',
        github: 'github.com/rickvanoirschot'
    }
}

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

const addMessage = (text, type = 'ai-chat-bot', suggestions = null) => {
    messages.value.push({
        id: messageId++,
        text,
        type,
        suggestions,
        isTyping: false
    })
    scrollToBottom()
}

const addTypingIndicator = () => {
    const typingMessage = {
        id: messageId++,
        text: '',
        type: 'typing',
        isTyping: true
    }
    messages.value.push(typingMessage)
    scrollToBottom()
    return typingMessage
}

const removeTypingIndicator = (typingMessage) => {
    const index = messages.value.findIndex(msg => msg.id === typingMessage.id)
    if (index !== -1) {
        messages.value.splice(index, 1)
    }
}

const sendMessage = async () => {
    const message = userInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, 'ai-chat-user')
    userInput.value = ''

    // Add typing indicator
    const typingMessage = addTypingIndicator()

    // Simulate response delay
    setTimeout(() => {
        removeTypingIndicator(typingMessage)
        const response = getAIResponse(message)
        addMessage(response.text, 'ai-chat-bot', response.suggestions)
    }, 1500)
}

const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('skill') || lowerMessage.includes('vaardig') || lowerMessage.includes('technolog')) {
        return {
            text: `Ricks technische vaardigheden omvatten: ${portfolioData.skills.join(', ')}. Hij is gespecialiseerd in moderne webontwikkeling met focus op Vue.js en Laravel.`,
            suggestions: [
                { title: '💼 Bekijk Ricks projecten', url: '/projects' },
                { title: '📋 Meer over Rick', url: '/about' }
            ]
        }
    }

    if (lowerMessage.includes('ervaring') || lowerMessage.includes('werk') || lowerMessage.includes('experience')) {
        return {
            text: `Ricks werkervaring omvat: ${portfolioData.experience.join(', ')}. Hij helpt bedrijven met het ontwikkelen van moderne webapplicaties.`,
            suggestions: [
                { title: '💼 Ricks projecten bekijken', url: '/projects' },
                { title: '📞 Contact opnemen met Rick', url: '/about' }
            ]
        }
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('bereik')) {
        return {
            text: `Je kunt contact opnemen met Rick via verschillende kanalen. Bekijk zijn contactgegevens op de "Over Rick" pagina voor alle opties.`,
            suggestions: [
                { title: '📋 Ricks contact info', url: '/about' },
                { title: '💼 Ricks projecten eerst bekijken', url: '/projects' }
            ]
        }
    }

    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('werk')) {
        return {
            text: `Rick heeft aan verschillende interessante projecten gewerkt, van webapplicaties tot API ontwikkeling. Bekijk zijn projectenpagina voor een volledig overzicht!`,
            suggestions: [
                { title: '💼 Alle projecten van Rick', url: '/projects' },
                { title: '🛠️ Ricks vaardigheden', url: '/about' }
            ]
        }
    }

    // Default response
    return {
        text: `Bedankt voor je vraag! Ik help je graag verder met informatie over Ricks portfolio. Gebruik de navigatie bubbles hieronder of stel een specifieke vraag over zijn vaardigheden, ervaring, of projecten.`,
        suggestions: [
            { title: '📋 Over Rick', url: '/about' },
            { title: '💼 Ricks projecten', url: '/projects' }
        ]
    }
}

// Quick action methods
const askAboutSkills = () => {
    addMessage('Wat zijn Ricks technische vaardigheden?', 'ai-chat-user')

    // Add typing indicator
    const typingMessage = addTypingIndicator()

    setTimeout(() => {
        removeTypingIndicator(typingMessage)
        const response = getAIResponse('skills')
        addMessage(response.text, 'ai-chat-bot', response.suggestions)
    }, 1500)
}

const askAboutContact = () => {
    addMessage('Hoe kan ik contact opnemen met Rick?', 'ai-chat-user')

    // Add typing indicator
    const typingMessage = addTypingIndicator()

    setTimeout(() => {
        removeTypingIndicator(typingMessage)
        const response = getAIResponse('contact')
        addMessage(response.text, 'ai-chat-bot', response.suggestions)
    }, 1500)
}

const askAboutExperience = () => {
    addMessage('Wat is Ricks werkervaring?', 'ai-chat-user')

    // Add typing indicator
    const typingMessage = addTypingIndicator()

    setTimeout(() => {
        removeTypingIndicator(typingMessage)
        const response = getAIResponse('ervaring')
        addMessage(response.text, 'ai-chat-bot', response.suggestions)
    }, 1500)
}
</script>

<style scoped>
.chat-homepage {
    width: 100%;
    min-height: calc(100vh - 80px);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    font-family: 'Quicksand', 'Segoe UI', sans-serif;
}

@keyframes ailoader {
    100% {
        box-shadow: 0 0 0 10px transparent;
    }
}

.ai-chat-wrapper {
    display: flex;
    position: relative;
    width: 800px;
    max-width: 90vw;
    height: auto;
    padding: 15px;
    border: 1px solid #ddd;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 400;
    text-align: start;
    align-items: stretch;
    flex-direction: column;
    box-sizing: border-box;
    overflow: visible;
    flex-grow: 0;
    flex-shrink: 1;
    box-shadow: 0px 14px 20px 0px #00000017;
    border-radius: 20px;
    flex-wrap: nowrap;
    justify-content: flex-start;
}

.ai-chat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    max-height: 460px;
    overflow-x: hidden;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: #cccccc transparent;
}

.ai-chat-container::-webkit-scrollbar {
    width: 8px;
}

.ai-chat-container::-webkit-scrollbar-track {
    background: transparent;
}

.ai-chat-container::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 10px;
}

.ai-chat-container::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
}

.ai-chat-container::-webkit-scrollbar-corner {
    background: transparent;
}

.ai-chat-container::-webkit-scrollbar-button {
    display: none;
}

.ai-chat-container::-webkit-scrollbar-track-piece {
    background: transparent;
}

.ai-chat-message {
    margin-bottom: 16px;
    padding: 10px 14px;
    border-radius: 10px;
    max-width: 80%;
    word-break: break-word;
}

.ai-chat-message.ai-chat-bot {
    background-color: #fafafa;
    align-self: flex-start;
    text-align: left;
    border: 1px solid #e4e4e4;
}

.ai-chat-message.ai-chat-user {
    background-color: #f2f9ff;
    align-self: flex-end;
    text-align: right;
    border: 1px solid #def1ff;
}

.ai-chat-message.typing {
    background-color: transparent !important;
    border: none !important;
    display: flex;
    align-items: center;
    gap: 10px;
}

.ai-chat-suggestions {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.ai-chat-suggestion-bubble {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000;
    padding: 8px 12px;
    border-radius: 20px;
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-decoration: none;
    font-size: 14px;
    line-height: 1em;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-block;
}

.ai-chat-suggestion-bubble:hover {
    background-color: #000000;
    color: #ffffff;
}

.ai-chat-loader {
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #666;
    box-shadow: 0 0 0 0 #8e8e8e;
    animation: ailoader 1s infinite;
}

.ai-chat-input-wrapper {
    display: flex;
    width: 100%;
    margin-top: 20px;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
}

.ai-chat-input {
    cursor: text;
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    line-height: 1.5em;
    background-color: #ffffff;
}

.ai-chat-submit {
    border-radius: 50%;
    height: 38px;
    width: 38px;
    background-color: #000000;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s ease;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="%23FFFFFF"><path d="M440-180v-448.08L237.15-425.23 180-481l299-299 301 301-57.15 55.77L518-628.08V-180h-78Z"></path></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px 20px;
    transform: rotate(45deg);
}

.ai-chat-submit:hover {
    background-color: #a544ee;
}

.ai-chat-submit:active {
    transform: rotate(45deg);
    box-shadow: none;
    outline: none;
    border: none;
}

.ai-chat-submit:focus {
    outline: none;
    box-shadow: none;
    border: none;
}

/* Focus styles */
.ai-chat-wrapper *:focus {
    outline: none !important;
}

/* Hero Text Styles */
.hero-text {
    width: 100%;
    height: 100px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
}

.rick-text {
    font-size: 120px;
    width: 100%;
    font-weight: bold;
    font-style: italic;
    font-family: 'Tomorrow', 'Quicksand', Arial, sans-serif;
    background: linear-gradient(90deg,
            #b518d4,
            #d1bffd,
            #8400ff,
            #fabede,
            #fa158fdd);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: gradientMove 10s linear infinite;
    display: inline-block;
    text-align: center;
    line-height: 1;
    text-shadow: 0 0 10px rgba(132, 6, 251, 0.05);
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 1;
}

/* Fallback for browsers that don't support background-clip: text */
.rick-text::before {
    content: "RICK";
    position: absolute;
    color: #333;
    z-index: -1;
}

/* AI Tooltip */
.tooltip-box {
    position: relative;
    margin-top: -24px;
    margin-left: 44%;
}

.tooltip {
    width: 84px;
    height: 23px;
    background: linear-gradient(75deg,
            #000000 0%,
            #000000 45%,
            #828282 50%,
            #000000 55%,
            #000000 100%);
    background-size: 200% 100%;
    animation: tooltipGradientMove 8s ease-in-out infinite;
    color: #ffffff;
    text-align: center;
    padding: 2px 4px 2px 4px;
    border-radius: 30px;
    position: relative;
    font-size: 7px;
    font-weight: bold;
    font-family: 'Tomorrow', 'Quicksand', Arial, sans-serif;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.triangle {
    border-width: 0 6.5px 5px;
    border-color: transparent;
    border-bottom-color: #000000;
    position: absolute;
    left: -5px;
    top: calc(50% - 2.5px);
    transform: rotate(270deg) translateY(-48%);
    width: 0;
    height: 0;
    border-style: solid;
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }

    25% {
        background-position: 50% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    75% {
        background-position: 50% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes tooltipGradientMove {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/* Responsive design */
@media (max-width: 768px) {
    .chat-homepage {
        padding: 1rem;
    }

    .hero-text {
        height: 120px;
        margin-bottom: 1rem;
    }

    .rick-text {
        font-size: 100px;
    }

    .tooltip-box {
        position: relative;
        margin-top: -24px;
        margin-left: 62%;
    }

    .ai-chat-wrapper {
        width: 100%;
        padding: 15px;
    }

    .ai-chat-container {
        max-height: 400px;
    }

    .ai-chat-message {
        max-width: 90%;
        padding: 12px 16px;
    }

    .ai-chat-suggestions {
        gap: 6px;
    }

    .ai-chat-suggestion-bubble {
        padding: 8px 12px;
        font-size: 13px;
    }
}
</style>
