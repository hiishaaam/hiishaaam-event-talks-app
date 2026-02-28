const talks = [
    {
        title: "The Future of JavaScript",
        speakers: ["Jane Doe"],
        category: ["JavaScript", "Web Development"],
        description: "An in-depth look at the upcoming features of ECMAScript and what they mean for the future of web development."
    },
    {
        title: "CSS Grids and Flexbox: A Deep Dive",
        speakers: ["John Smith"],
        category: ["CSS", "Frontend"],
        description: "Learn how to create complex and responsive layouts with ease using the power of CSS Grids and Flexbox."
    },
    {
        title: "Building Scalable APIs with Node.js",
        speakers: ["Emily Jones", "Mike Brown"],
        category: ["Node.js", "Backend", "API"],
        description: "A comprehensive guide to building robust and scalable APIs using Node.js, Express, and best practices."
    },
    {
        title: "State Management in Modern Web Apps",
        speakers: ["Chris Wilson"],
        category: ["JavaScript", "Frontend", "State Management"],
        description: "Exploring different state management patterns and libraries like Redux, MobX, and the Context API in React."
    },
    {
        title: "Introduction to Machine Learning with Python",
        speakers: ["David Lee"],
        category: ["Python", "Machine Learning"],
        description: "A beginner-friendly introduction to the world of machine learning using Python and popular libraries like Scikit-learn."
    },
    {
        title: "Securing Your Web Applications",
        speakers: ["Sarah Miller"],
        category: ["Security", "Web Development"],
        description: "Learn about common security vulnerabilities in web applications and how to prevent them. Covers topics like XSS, CSRF, and SQL injection."
    }
];

const scheduleContainer = document.getElementById('schedule');
const searchInput = document.getElementById('searchInput');

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderSchedule(filteredTalks) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const talksToRender = filteredTalks || talks;

    talksToRender.forEach((talk, index) => {
        if (index === 3) {
            const lunchBreak = document.createElement('div');
            lunchBreak.className = 'item break';
            lunchBreak.innerHTML = `<h2>Lunch Break</h2><span class="time">${formatTime(currentTime)} - ${formatTime(new Date(currentTime.getTime() + 60 * 60 * 1000))}</span>`;
            scheduleContainer.appendChild(lunchBreak);
            currentTime.setMinutes(currentTime.getMinutes() + 60);
        }

        const talkElement = document.createElement('div');
        talkElement.className = 'item';

        const talkEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

        talkElement.innerHTML = `
            <span class="time">${formatTime(currentTime)} - ${formatTime(talkEndTime)}</span>
            <h2>${talk.title}</h2>
            <div class="speakers">By: ${talk.speakers.join(', ')}</div>
            <div class="category">
                ${talk.category.map(c => `<span>${c}</span>`).join('')}
            </div>
            <p>${talk.description}</p>
        `;

        scheduleContainer.appendChild(talkElement);

        currentTime = new Date(talkEndTime.getTime() + 10 * 60 * 1000);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
        talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
});

document.addEventListener('DOMContentLoaded', () => {
    renderSchedule();
});
