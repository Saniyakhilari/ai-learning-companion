/* =========================================================
   AI LEARNING COMPANION - SCRIPT & LOGIC
   Handles Public / App Layout navigation, AI Chat, MCQ Quiz,
   Flashcards, Homework Helper, Exam Timer, Language & Profile Settings.
   ========================================================= */

// Navigation & Layout Controller
const PUBLIC_SECTIONS = ['landing', 'login', 'signup'];

function showSection(id) {
    const targetSection = document.getElementById(id);
    if (!targetSection) return;

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    targetSection.classList.add('active');

    // Manage Public vs App Shell layout mode
    const container = document.querySelector('.container');
    if (container) {
        if (PUBLIC_SECTIONS.includes(id)) {
            container.classList.add('public-mode');
        } else {
            container.classList.remove('public-mode');
        }
    }

    // Highlight active nav item in sidebar
    document.querySelectorAll('.sidebar button').forEach(btn => {
        const btnSection = btn.getAttribute('data-section');
        if (btnSection === id) {
            btn.classList.add('active-nav');
        } else {
            btn.classList.remove('active-nav');
        }
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme Switcher
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// =========================================================
// PROFILE & LANGUAGE SETTINGS MANAGEMENT
// =========================================================
function saveProfile(event) {
    if (event) event.preventDefault();

    const studentName = document.getElementById('studentName')?.value || "";
    const studentClass = document.getElementById('studentClass')?.value || "";
    const studentBoard = document.getElementById('studentBoard')?.value || "";
    const examGoal = document.getElementById('examGoal')?.value || "";
    const appLanguage = document.getElementById('appLanguage')?.value || "English";
    const aiResponseLanguage = document.getElementById('aiResponseLanguage')?.value || "Auto Detect";

    const studentProfile = {
        studentName: studentName,
        studentClass: studentClass,
        studentBoard: studentBoard,
        examGoal: examGoal,
        appLanguage: appLanguage,
        aiResponseLanguage: aiResponseLanguage
    };

    localStorage.setItem('studentProfile', JSON.stringify(studentProfile));

    // Sync header avatar badge name if available
    const badgeName = document.querySelector('.user-profile-name');
    if (badgeName && studentName) {
        badgeName.innerText = studentName;
    }

    alert('Settings saved successfully!');
    showSection('home');
}

function loadProfile() {
    const savedData = localStorage.getItem('studentProfile');
    if (savedData) {
        try {
            const profile = JSON.parse(savedData);
            if (profile.studentName && document.getElementById('studentName')) {
                document.getElementById('studentName').value = profile.studentName;
                const badgeName = document.querySelector('.user-profile-name');
                if (badgeName) badgeName.innerText = profile.studentName;
            }
            if (profile.studentClass && document.getElementById('studentClass')) {
                document.getElementById('studentClass').value = profile.studentClass;
            }
            if (profile.studentBoard && document.getElementById('studentBoard')) {
                document.getElementById('studentBoard').value = profile.studentBoard;
            }
            if (profile.examGoal && document.getElementById('examGoal')) {
                document.getElementById('examGoal').value = profile.examGoal;
            }
            if (profile.appLanguage && document.getElementById('appLanguage')) {
                document.getElementById('appLanguage').value = profile.appLanguage;
            }
            if (profile.aiResponseLanguage && document.getElementById('aiResponseLanguage')) {
                document.getElementById('aiResponseLanguage').value = profile.aiResponseLanguage;
            }
        } catch (err) {
            console.error('Error loading student profile from localStorage:', err);
        }
    }
}

function initProfileForm() {
    const profileForm = document.querySelector('#settings form');
    if (profileForm) {
        profileForm.addEventListener('submit', saveProfile);
    }
    loadProfile();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfileForm);
} else {
    initProfileForm();
}


// =========================================================
// AI CHAT ASSISTANT LOGIC (Educational Knowledge Base)
// =========================================================
const answers = {
"what is ai":
"Artificial Intelligence is a branch of computer science that allows machines to perform tasks that normally require human intelligence. AI systems can learn, reason, solve problems, and make decisions automatically. AI is used in robots, virtual assistants, and self-driving cars.",

"what is machine learning":
"Machine Learning is a subset of Artificial Intelligence that allows computers to learn from data automatically. It helps systems improve performance without direct programming. Machine learning algorithms identify patterns and make predictions.",

"difference between ai and ml":
"Artificial Intelligence is a broad field focused on creating intelligent machines. Machine Learning is a subset of AI that helps machines learn from data. AI includes reasoning, planning, and decision-making abilities. ML mainly focuses on pattern recognition and predictions.",

"advantages of ai":
"Artificial Intelligence offers many advantages in modern industries and daily life. AI can automate repetitive tasks and save time. It improves speed, accuracy, and efficiency in work processes.",

"applications of ai":
"Artificial Intelligence is used in healthcare for disease detection, in banking for fraud detection, in virtual assistants like Siri and Alexa, in self-driving cars, and in online recommendation systems.",

"explain osi model":
"The OSI Model is a networking framework that contains seven layers for communication systems: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer performs specific tasks during data transmission.",

"what is cpu":
"CPU stands for Central Processing Unit and is called the brain of the computer. It processes instructions and performs calculations required by programs. Faster CPUs improve computer speed and multitasking performance.",

"what is ram":
"RAM stands for Random Access Memory and is temporary storage used in computers. It stores data and programs currently being used by the CPU. RAM is volatile memory, meaning data is lost when power is turned off.",

"difference between hdd and ssd":
"HDD uses spinning disks to store data, whereas SSD uses flash memory technology. SSDs are much faster than HDDs in reading and writing data, consume less power, and produce less noise.",

"what is cloud computing":
"Cloud Computing is the delivery of computing services over the internet, including storage, servers, software, and databases. Users can access files and applications from anywhere with internet access.",

"what is probability":
"Probability is a branch of mathematics that measures the chance of an event occurring. Its value ranges between 0 (impossible) and 1 (certain). It is widely used in statistics, science, and machine learning.",

"explain bayes theorem":
"Bayes Theorem is a mathematical formula used to calculate conditional probability based on prior evidence and updates predictions when new information becomes available.",

"what is binomial distribution":
"Binomial Distribution is a probability distribution with two possible outcomes such as success or failure across fixed independent trials.",

"what is solar cell":
"A Solar Cell converts sunlight into electrical energy using the photovoltaic effect, commonly used in solar panels and renewable energy systems.",

"what is renewable energy":
"Renewable Energy is energy obtained from natural resources that replenish continuously, such as solar, wind, hydro, and geothermal energy.",

"give me study tips":
"Create a proper study schedule and follow it consistently. Study in a quiet place without distractions. Divide large topics into smaller sections. Revise regularly and take short breaks.",

"how to prepare for exam":
"Start early, make a timetable for all subjects, focus on difficult topics first, revise notes regularly, and solve sample papers.",

"motivate me to study":
"Studying helps you build a successful future and achieve your goals. Every small effort today creates better opportunities tomorrow. Stay positive and keep learning!"
};

function sendMessage() {
    const input = document.getElementById('userInput');
    if (!input) return;

    const rawMessage = input.value;
    const message = rawMessage.trim().toLowerCase().replace(/[?.!,]/g, "");

    if (message === "") return;

    const chatBox = document.getElementById('chatBox');
    if (!chatBox) return;

    chatBox.innerHTML += `
        <div class="chat-message user">
            ${rawMessage}
        </div>
    `;

    let response = answers[message] ||
        "Sorry, I only answer educational questions from my knowledge base. Try asking about CPU, RAM, AI, ML, OSI model, or study tips!";

    setTimeout(() => {
        chatBox.innerHTML += `
            <div class="chat-message bot">
                ${response}
            </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    input.value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElem = document.getElementById('userInput');
    if (inputElem) {
        inputElem.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});


// =========================================================
// MCQ QUIZ ENGINE LOGIC
// =========================================================
const quizData = [
    {
        question: "What does AI stand for?",
        options: ["Artificial Intelligence", "Advanced Internet", "Automatic Input", "Artificial Input"],
        answer: "Artificial Intelligence"
    },
    {
        question: "Which part is called brain of computer?",
        options: ["RAM", "CPU", "SSD", "Mouse"],
        answer: "CPU"
    },
    {
        question: "Which storage device is faster?",
        options: ["HDD", "SSD", "DVD", "CD"],
        answer: "SSD"
    },
    {
        question: "Which energy comes from sunlight?",
        options: ["Solar", "Hydro", "Wind", "Thermal"],
        answer: "Solar"
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Machine", "Random Active Monitor"],
        answer: "Random Access Memory"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const resultDiv = document.getElementById('result');
    if (!quizContainer || !resultDiv) return;

    if (currentQuestion >= quizData.length) {
        quizContainer.style.display = 'none';
        resultDiv.innerHTML = `
            <div class="card" style="text-align: center; padding: 30px;">
                <h2>🎉 Quiz Completed!</h2>
                <p style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald); margin: 16px 0;">Your Score: ${score} / ${quizData.length}</p>
                <button class="btn btn-primary" onclick="restartQuiz()">Restart Quiz</button>
            </div>
        `;

        localStorage.setItem('quizScore', score);
        localStorage.setItem('quizCount', Number(localStorage.getItem('quizCount') || 0) + 1);

        updateDashboard();
        return;
    }

    const q = quizData[currentQuestion];
    const questionHeading = document.getElementById('question');
    const optionsDiv = document.getElementById('options');

    if (questionHeading) questionHeading.innerText = `Question ${currentQuestion + 1}: ${q.question}`;
    if (optionsDiv) {
        optionsDiv.innerHTML = '';
        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.innerText = option;
            btn.onclick = () => {
                if (option === q.answer) {
                    score++;
                }
                currentQuestion++;
                loadQuestion();
            };
            optionsDiv.appendChild(btn);
        });
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    const quizContainer = document.getElementById('quizContainer');
    const resultDiv = document.getElementById('result');

    if (quizContainer) quizContainer.style.display = 'block';
    if (resultDiv) resultDiv.innerHTML = '';

    loadQuestion();
}

loadQuestion();


// =========================================================
// PROGRESS DASHBOARD LOGIC
// =========================================================
function updateDashboard() {
    const scoreData = localStorage.getItem('quizScore') || 0;
    const quizCount = localStorage.getItem('quizCount') || 0;

    const scoreDisplay = document.getElementById('scoreDisplay');
    const quizCountDisplay = document.getElementById('quizCount');
    const progressBar = document.getElementById('progress');

    if (scoreDisplay) scoreDisplay.innerText = scoreData;
    if (quizCountDisplay) quizCountDisplay.innerText = quizCount;

    if (progressBar) {
        let progressPercent = (scoreData / quizData.length) * 100;
        progressBar.style.width = progressPercent + '%';
    }
}

updateDashboard();


// =========================================================
// FLASHCARDS TOOL LOGIC
// =========================================================
const flashcardsData = [
    { category: "Computer Science", question: "What is CPU?", answer: "Central Processing Unit — the primary component that executes instructions in a computer." },
    { category: "Computer Science", question: "What is RAM?", answer: "Random Access Memory — high-speed volatile memory used for active programs." },
    { category: "Networking", question: "What is OSI Layer 3?", answer: "Network Layer — handles packet routing and logical IP addressing." },
    { category: "Artificial Intelligence", question: "What is Machine Learning?", answer: "A branch of AI that allows systems to learn from data patterns without explicit programming." },
    { category: "Mathematics", question: "What is Bayes Theorem?", answer: "A probability formula that updates conditional probability based on prior evidence." }
];

let fcIndex = 0;
let isFlipped = false;

function renderFlashcard() {
    const fcCategory = document.getElementById('fcCategory');
    const fcText = document.getElementById('fcText');
    const current = flashcardsData[fcIndex];

    if (fcCategory) fcCategory.innerText = current.category;
    if (fcText) fcText.innerText = isFlipped ? current.answer : current.question;
}

function flipFlashcard() {
    isFlipped = !isFlipped;
    renderFlashcard();
}

function nextFlashcard() {
    isFlipped = false;
    fcIndex = (fcIndex + 1) % flashcardsData.length;
    renderFlashcard();
}

function prevFlashcard() {
    isFlipped = false;
    fcIndex = (fcIndex - 1 + flashcardsData.length) % flashcardsData.length;
    renderFlashcard();
}

renderFlashcard();


// =========================================================
// HOMEWORK HELPER LOGIC
// =========================================================
function solveHomework() {
    const subject = document.getElementById('hwSubject')?.value || "General";
    const question = document.getElementById('hwQuestion')?.value || "";
    const resultDiv = document.getElementById('hwResult');

    if (!resultDiv) return;

    if (!question.trim()) {
        resultDiv.innerHTML = `<p style="color: var(--accent-rose);">Please enter a problem prompt or question above.</p>`;
        return;
    }

    resultDiv.innerHTML = `
        <h4 style="color: var(--accent-indigo); margin-bottom: 8px;">Step-by-Step Guidance (${subject}):</h4>
        <ol style="padding-left: 20px; line-height: 1.6; font-size: 0.92rem;">
            <li><strong>Identify Core Concept:</strong> Break down "${question.substring(0, 40)}..." into foundational terms.</li>
            <li><strong>Analyze Formula / Logic:</strong> Apply core principles from your ${subject} syllabus.</li>
            <li><strong>Step-by-Step Solution:</strong> Review key variables, substitute values, and verify edge cases.</li>
        </ol>
        <p style="margin-top: 10px; font-weight: 600; color: var(--accent-teal);">Tip: Ask AI Chat for a deeper breakdown of any specific step!</p>
    `;
}


// =========================================================
// EXAM MODE TIMER LOGIC
// =========================================================
let timerSeconds = 600; // 10 minutes
let timerInterval = null;

function startExamTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("⏰ Exam Focus Sprint Completed!");
            return;
        }

        timerSeconds--;
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        const display = document.getElementById('examTimerDisplay');
        if (display) {
            display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function resetExamTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerSeconds = 600;
    const display = document.getElementById('examTimerDisplay');
    if (display) {
        display.innerText = "10:00";
    }
}


// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}