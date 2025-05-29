const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Disable caching for development
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.use(express.static('public', {
    etag: false,
    lastModified: false
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'resume.html'));
});

app.get('/work', (req, res) => {
    res.sendFile(path.join(__dirname, 'work.html'));
});

app.get('/experience', (req, res) => {
    res.sendFile(path.join(__dirname, 'experience.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/learning', (req, res) => {
    res.sendFile(path.join(__dirname, 'learning.html'));
});

// Contact form handler
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Here you would typically send an email or store the message
    // For now, we'll just log it
    console.log('Contact Form Submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });

    res.status(200).json({ message: 'Message received successfully' });
});

// Resume download route
app.get('/resume/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', 'resume', filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            res.status(404).send('Resume not found');
        }
    });
});

// API Routes for dynamic content
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'Vinod Pandey',
        role: 'Computer Science Student',
        intro: "Hey, I am Vinod Pandey, a 3rd-year Computer Science student at Graphic Era Hill University Dehradun. Passionate about web development, machine learning, and problem-solving in Data structure and algorithms. Constantly building projects and exploring new technologies.",
        education: {
            degree: 'Bachelor of Technology in Computer Science',
            school: 'Graphic Era Hill University, Dehradun',
            year: '3rd Year'
        },
        skills: {
            languages: ['Python', 'Java', 'C++', 'JavaScript'],
            frontend: ['HTML5', 'CSS3', 'React.js', 'Bootstrap'],
            backend: ['Node.js', 'Flask', 'Express.js'],
            ml: ['TensorFlow', 'NLTK', 'OpenCV', 'CNN'],
            databases: ['MongoDB', 'MySQL'],
            tools: ['Git', 'VS Code', 'Postman', 'Docker']
        },
        projects: [
            {
                title: 'Handwritten Character Recognition',
                description: 'A deep learning-based project using a CNN trained on the EMNIST dataset to recognize and classify handwritten characters.',
                technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask']
            },
            {
                title: 'Twitter Sentiment Analysis',
                description: 'A web app that analyzes the sentiment of tweets using an ML model, fetching tweet comments via a Twitter API and displaying sentiment insights.',
                technologies: ['Python', 'NLTK', 'Twitter API', 'Flask', 'D3.js']
            },
            {
                title: 'Image Compressor',
                description: 'A web-based tool that reduces the file size of images using Python-based compression algorithms while maintaining visual quality.',
                technologies: ['Python', 'PIL', 'Flask', 'JavaScript', 'HTML/CSS']
            },
            {
                title: 'OS Algorithm Visualizer',
                description: 'A web tool that visualizes key OS algorithms like Process, Disk Scheduling, and Memory Management with interactive animations.',
                technologies: ['JavaScript', 'D3.js', 'HTML5', 'CSS3', 'Bootstrap']
            },
            {
                title: 'Currency Converter',
                description: 'A simple web app that converts currency values in real-time using exchange rate APIs, supporting multiple international currencies.',
                technologies: ['JavaScript', 'React.js', 'Exchange API', 'Chart.js', 'Bootstrap']
            }
        ],
        contact: {
            email: 'butola.ritik98@gmail.com',
            phone: '7818956475',
            location: 'Dehradun, Uttarakhand, India',
            social: {
                github: 'https://github.com/ritikbutola',
                linkedin: 'https://www.linkedin.com/in/ritik-butola/',
                leetcode: ''
            }
        }
    });
});

// API endpoint for weekly learning data
app.get('/api/learning', (req, res) => {
    res.json({
        weeks: [
            {
                week: 1,
                title: "Introduction",
                content: "During the first week, I delved into the art of self-introduction, a skill that is often underestimated but crucial in both academic and professional environments. I learned how to present myself with confidence, clarity, and authenticity, ensuring that my background, interests, and aspirations are communicated effectively. The sessions emphasized the importance of tailoring my introduction to suit different audiences, whether in interviews, networking events, or formal presentations. Additionally, I discovered how non-verbal cues such as eye contact, posture, and tone of voice can significantly enhance the impact of my introduction, leaving a memorable impression on others.",
                video: "#"
            },
            {
                week: 2,
                title: "Resume",
                content: "This week was dedicated to mastering the craft of resume writing. I explored various resume formats, including chronological, functional, and hybrid, and learned when each is most effective. The focus was on constructing concise yet impactful bullet points that highlight my achievements and skills using action verbs and quantifiable results. I also gained insights into optimizing resumes for applicant tracking systems (ATS) by incorporating relevant keywords. Through practical exercises, I practiced customizing my resume for specific job roles, ensuring that my experiences and strengths are presented in the best possible light.",
                videos: {
                    resume: "https://docs.google.com/document/d/1a2owRP6g-z_CWUmb_PyTzDopxP0q2gjh/edit?usp=drive_link&ouid=104584705595057345299&rtpof=true&sd=true"
                }
            },
            {
                week: 3,
                title: "Extempore",
                content: "The extempore sessions were both challenging and rewarding, pushing me to think on my feet and articulate my thoughts clearly under time constraints. I learned to quickly organize my ideas, structure my responses logically, and present key points with confidence. These exercises not only improved my spontaneity and fluency but also helped me manage anxiety and stay composed during public speaking. The experience underscored the value of preparation, presence of mind, and adaptability in effective communication.",
                topic: "The impact of technology on communication",
                video: "#"
            },
            {
                week: 4,
                title: "Movie Review",
                content: {
                    movie: "The Shawshank Redemption",
                    review: "In reviewing 'The Shawshank Redemption,' I was deeply moved by its powerful themes of hope, perseverance, and redemption. The story of Andy Dufresne, who maintains his optimism and integrity despite the harsh realities of prison life, serves as a testament to the human spirit's resilience. The film beautifully portrays the importance of friendship, trust, and the unwavering belief in a better future. It also offers profound insights into the effects of institutionalization and the struggle for freedom, making it a timeless lesson in endurance and hope.",
                    favourite_dialogue: "Get busy living, or get busy dying.",
                    dialogue_significance: "This line captures the essence of making choices in life, emphasizing the importance of hope, action, and perseverance even in the face of adversity.",
                    learning_takeaways: [
                        "Resilience in adversity",
                        "Value of friendship",
                        "Embracing change"
                    ],
                    classroom_concepts: "The movie's exploration of resilience, ethics, and communication skills resonated with our classroom discussions on self-development and personal growth."
                }
            },
            {
                week: 5,
                title: "Public Speaking",
                content: "Public speaking, once a daunting prospect, became an area of growth and self-discovery this week. Through activities like JAM and extempore, I learned to engage my audience with a compelling introduction, maintain a natural flow, and use pauses effectively. The sessions highlighted the importance of vocal modulation—varying tone, pace, and pitch—to keep listeners interested. I also practiced using body language, eye contact, and gestures to reinforce my message and convey confidence. These experiences have significantly boosted my self-assurance and ability to communicate persuasively in front of an audience.",
                videos: {
                    extempore: "#",
                    jam: "#",
                    project_presentation: "#"
                }
            },
            {
                week: 6,
                title: "Essay Writing",
                content: "Essay writing this week was a journey into organizing my thoughts and expressing them with clarity and depth. I learned to craft strong introductions that set the stage for my arguments, develop body paragraphs that provide analysis and evidence, and conclude with impactful statements. The process of brainstorming, outlining, and revising drafts taught me that great writing is achieved through thoughtful editing and reflection. I also discovered how to express opinions respectfully, support arguments with logic, and make my writing reflect my unique perspective.",
                essays: [
                    "The Role of Artificial Intelligence in Modern Education",
                    "Climate Change and Its Impact on Global Health"
                ]
            },
            {
                week: 7,
                title: "Group Discussion",
                content: "Group discussion sessions were instrumental in developing my ability to communicate and collaborate effectively within a team. I learned to balance assertiveness with empathy, ensuring that I contribute my ideas while also valuing the perspectives of others. The sessions emphasized the importance of active listening, building on others' points, and maintaining focus on the topic. These skills have not only improved my participation in group settings but also enhanced my overall communication and teamwork abilities."
            },
            {
                week: 8,
                title: "Interview Skills",
                content: "The focus this week was on preparing for interviews and presenting myself professionally. I practiced answering common interview questions using the STAR (Situation, Task, Action, Result) technique, which helped me structure my responses effectively. The sessions also covered the significance of body language, eye contact, and a positive attitude in making a strong impression. Mock interviews provided valuable feedback, helping me identify my strengths and areas for improvement, and boosting my confidence for real-world interview scenarios.",
                guidelines: {
                    dos: [
                        "Research the company",
                        "Dress professionally",
                        "Greet confidently",
                        "Give structured answers"
                    ],
                    donts: [
                        "Don't lie",
                        "Don't interrupt",
                        "Don't show arrogance",
                        "Don't criticize past employers"
                    ]
                }
            }
        ]
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
}); 