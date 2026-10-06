function showSection(id){

    document.querySelectorAll('.section').forEach(section=>{
        section.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');
}

function toggleTheme(){
    document.body.classList.toggle('light-mode');
}

const answers = {

"what is ai":
"Artificial Intelligence is a branch of computer science that allows machines to perform tasks that normally require human intelligence. AI systems can learn, reason, solve problems, and make decisions automatically. AI is used in robots, virtual assistants, and self-driving cars. It improves efficiency and reduces human effort in many industries. AI can analyze large amounts of data quickly and accurately. It is widely used in healthcare, banking, education, and gaming. AI technology is continuously growing around the world. It is one of the most important modern technologies.",

"what is machine learning":
"Machine Learning is a subset of Artificial Intelligence that allows computers to learn from data automatically. It helps systems improve performance without direct programming. Machine learning algorithms identify patterns and make predictions. It is used in recommendation systems, image recognition, and spam filtering. ML requires training data to learn effectively. Companies use machine learning for automation and business analysis. It helps computers become smarter over time. Machine learning is an important part of modern AI systems.",

"difference between ai and ml":
"Artificial Intelligence is a broad field focused on creating intelligent machines. Machine Learning is a subset of AI that helps machines learn from data. AI includes reasoning, planning, and decision-making abilities. ML mainly focuses on pattern recognition and predictions. AI systems may or may not use machine learning. Machine learning requires training data for better performance. AI aims to mimic human intelligence completely. Both AI and ML are important technologies in modern computing.",

"advantages of ai":
"Artificial Intelligence offers many advantages in modern industries and daily life. AI can automate repetitive tasks and save time. It improves speed, accuracy, and efficiency in work processes. AI systems can work continuously without becoming tired. It helps reduce human errors in calculations and analysis. AI is useful in healthcare, banking, transportation, and education. It can analyze large amounts of data quickly. AI technology also supports innovation and smart automation.",

"applications of ai":
"Artificial Intelligence is used in many real-world applications today. AI is used in healthcare for disease detection and medical analysis. Banks use AI for fraud detection and customer support systems. AI powers virtual assistants like Siri and Alexa. Self-driving cars use AI for navigation and safety features. Online platforms use AI recommendation systems for movies and shopping. AI is also used in robotics, cybersecurity, and education. Its applications are increasing rapidly across industries.",

"explain osi model":
"The OSI Model is a networking framework that contains seven layers for communication systems. The layers are Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer performs specific tasks during data transmission. The model helps standardize communication between devices. Network engineers use the OSI model for troubleshooting and design. It improves understanding of computer networking concepts. The OSI model explains how data travels through networks. It is very important in networking education.",

"what is cpu":
"CPU stands for Central Processing Unit and is called the brain of the computer. It processes instructions and performs calculations required by programs. The CPU controls all operations inside the computer system. Faster CPUs improve computer speed and multitasking performance. CPUs are used in computers, mobile phones, and servers. Modern CPUs contain multiple cores for better efficiency. It works closely with RAM and storage devices. The CPU is one of the most important hardware components.",

"what is ram":
"RAM stands for Random Access Memory and is temporary storage used in computers. It stores data and programs currently being used by the CPU. More RAM helps improve multitasking and system performance. RAM is volatile memory, meaning data is lost when power is turned off. It increases the speed of applications and operating systems. Low RAM can make computers slow and unresponsive. RAM is available in different capacities and speeds. It is an essential component in modern computing systems.",

"difference between hdd and ssd":
"HDD stands for Hard Disk Drive, while SSD stands for Solid State Drive. HDD uses spinning disks to store data, whereas SSD uses flash memory technology. SSDs are much faster than HDDs in reading and writing data. HDDs are cheaper and provide larger storage capacity. SSDs consume less power and produce less noise. Computers with SSDs start faster and load applications quickly. HDDs contain moving parts and are more prone to damage. SSDs are widely used in modern laptops and gaming systems.",

"what is cloud computing":
"Cloud Computing is the delivery of computing services over the internet. It provides storage, servers, software, and databases online. Users can access files and applications from anywhere with internet access. Cloud computing reduces the need for expensive hardware systems. Popular cloud platforms include AWS, Google Cloud, and Microsoft Azure. It supports remote collaboration and data backup solutions. Businesses use cloud computing for flexibility and scalability. It is an important technology in the digital world.",

"what is probability":
"Probability is a branch of mathematics that measures the chance of an event occurring. Its value ranges between 0 and 1. A probability of 0 means the event is impossible, while 1 means it is certain. Probability is widely used in statistics and science experiments. It helps predict outcomes based on data and observations. Weather forecasting and games use probability concepts. Probability is important in machine learning and data analysis. It plays a major role in real-life decision-making.",

"explain bayes theorem":
"Bayes Theorem is a mathematical formula used to calculate conditional probability. It helps determine the probability of an event using prior knowledge. Bayes Theorem is important in statistics and machine learning applications. It is used in spam filtering and medical diagnosis systems. The theorem updates predictions when new information becomes available. It improves accuracy in probability calculations and analysis. Data scientists use Bayes Theorem in AI and analytics. It is one of the most important concepts in probability theory.",

"what is binomial distribution":
"Binomial Distribution is a probability distribution with two possible outcomes such as success or failure. It measures the probability of obtaining a fixed number of successes in several trials. Each trial must be independent and have the same probability. It is widely used in mathematics and statistics. Examples include coin tossing and quality testing experiments. Binomial distribution helps analyze repeated events mathematically. It is useful in probability and data analysis studies. It is an important topic in statistics.",

"what is solar cell":
"A Solar Cell is a device that converts sunlight into electrical energy using the photovoltaic effect. Solar cells are commonly used in solar panels and renewable energy systems. They help generate clean and eco-friendly electricity. Solar energy reduces dependence on fossil fuels and pollution. Solar cells are used in homes, industries, calculators, and satellites. They require sunlight for efficient power generation. Solar technology is becoming more popular worldwide. It is important for sustainable energy solutions.",

"what is renewable energy":
"Renewable Energy is energy obtained from natural resources that can be replenished continuously. Examples include solar, wind, hydro, and geothermal energy sources. Renewable energy reduces pollution and greenhouse gas emissions. It helps protect the environment and fight climate change. Many countries are investing in renewable energy projects. Renewable energy is sustainable and eco-friendly compared to fossil fuels. It reduces dependence on non-renewable resources. Renewable energy is important for future energy development.",

"give me study tips":
"Create a proper study schedule and follow it consistently every day. Study in a quiet place without distractions from phones or social media. Divide large topics into smaller sections for easy understanding. Revise important concepts regularly to improve memory. Take short breaks between study sessions to stay fresh and focused. Practice questions and solve previous exam papers regularly. Sleep properly and maintain good health while studying. Consistent effort and discipline lead to academic success.",

"how to prepare for exam":
"Start exam preparation early and avoid last-minute studying before exams. Make a timetable for all subjects and follow it daily. Focus more on difficult and important topics first. Revise notes regularly and practice writing answers clearly. Solve sample papers and previous year question papers. Take proper sleep before exams to stay mentally active and confident. Avoid stress and maintain a positive mindset during preparation. Good planning and revision improve exam performance greatly.",

"motivate me to study":
"Studying helps you build a successful future and achieve your goals in life. Every small effort today creates better opportunities tomorrow. Education increases confidence, knowledge, and career growth. Hard work and consistency always bring positive results. Avoid comparing yourself with others and focus on self-improvement. Remember that success comes from daily practice and dedication. Your future self will thank you for studying today. Stay positive, keep learning, and never give up on your dreams."

};

function sendMessage(){

    const input=document.getElementById('userInput');
    const message = input.value
    .trim()
    .toLowerCase()
    .replace(/[?.!,]/g, "");

    if(message==="") return;

    const chatBox=document.getElementById('chatBox');

    chatBox.innerHTML+=`
    <div class="chat-message user">
        ${input.value}
    </div>
    `;

    let response=answers[message] ||
    "Sorry, I only answer educational questions from my knowledge base.";

    setTimeout(()=>{

        chatBox.innerHTML+=`
        <div class="chat-message bot">
            ${response}
        </div>
        `;

        chatBox.scrollTop=chatBox.scrollHeight;

    },500);

    input.value="";
}

document.getElementById('userInput').addEventListener('keypress',function(e){

    if(e.key==='Enter'){
        sendMessage();
    }
});

const quizData=[

{
question:"What does AI stand for?",
options:[
"Artificial Intelligence",
"Advanced Internet",
"Automatic Input",
"Artificial Input"
],
answer:"Artificial Intelligence"
},

{
question:"Which part is called brain of computer?",
options:[
"RAM",
"CPU",
"SSD",
"Mouse"
],
answer:"CPU"
},

{
question:"Which storage device is faster?",
options:[
"HDD",
"SSD",
"DVD",
"CD"
],
answer:"SSD"
},

{
question:"Which energy comes from sunlight?",
options:[
"Solar",
"Hydro",
"Wind",
"Thermal"
],
answer:"Solar"
},

{
question:"What does RAM stand for?",
options:[
"Random Access Memory",
"Read Access Memory",
"Rapid Access Machine",
"Random Active Monitor"
],
answer:"Random Access Memory"
}

];

let currentQuestion=0;
let score=0;

function loadQuestion(){

    if(currentQuestion>=quizData.length){

        document.getElementById('quizContainer').style.display='none';

        document.getElementById('result').innerHTML=`
        <h2>Your Score: ${score}/${quizData.length}</h2>
        <button onclick="restartQuiz()">Restart Quiz</button>
        `;

        localStorage.setItem('quizScore',score);

        localStorage.setItem(
            'quizCount',
            Number(localStorage.getItem('quizCount')||0)+1
        );

        updateDashboard();

        return;
    }

    const q=quizData[currentQuestion];

    document.getElementById('question').innerText=q.question;

    const optionsDiv=document.getElementById('options');

    optionsDiv.innerHTML='';

    q.options.forEach(option=>{

        const btn=document.createElement('button');

        btn.innerText=option;

        btn.onclick=()=>{

            if(option===q.answer){
                score++;
            }

            currentQuestion++;
            loadQuestion();
        };

        optionsDiv.appendChild(btn);
    });
}

function restartQuiz(){

    currentQuestion=0;
    score=0;

    document.getElementById('quizContainer').style.display='block';

    document.getElementById('result').innerHTML='';

    loadQuestion();
}

loadQuestion();

function updateDashboard(){

    const scoreData=localStorage.getItem('quizScore')||0;

    const quizCount=localStorage.getItem('quizCount')||0;

    document.getElementById('scoreDisplay').innerText=scoreData;

    document.getElementById('quizCount').innerText=quizCount;

    let progress=(scoreData/quizData.length)*100;

    document.getElementById('progress').style.width=progress+'%';
}

updateDashboard();

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js');
}