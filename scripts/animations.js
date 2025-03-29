// scripts/animations.js

// Typing Animation with Random Quotes
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.quotes = [
            "Full Stack Developer",
            "Open Source Contributor",
            "UI/UX Enthusiast",
            ".NET Specialist",
            "Problem Solver"
        ];
        this.type();
    }

    type() {
        // Alternate between projects and random quotes
        const currentIdx = this.wordIndex % this.words.length;
        let fullTxt = this.wordIndex < this.words.length 
            ? this.words[currentIdx] 
            : this.quotes[Math.floor(Math.random() * this.quotes.length)];

        // Add/delete characters
        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        // Update DOM
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">&nbsp;</span>`;

        // Speed control
        let typeSpeed = this.isDeleting ? 75 : 150;
        if (this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typed-text');
    const words = ["DocMaster", "Personal Doctor", "DevFinder", "AuroraPanel"];
    const wait = 2000;
    new TypeWriter(txtElement, words, wait);
});

// Skills Tab Switching (kept for functionality)
document.querySelectorAll('.skills-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.skills-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

// About Tab Switching (kept for functionality)
document.querySelectorAll('.about-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.about-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.about-content .tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

// Notification System (kept for form submissions)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.width = width;
    });
}

// Initialize when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe the skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
