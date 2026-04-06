// script.js

// Navigation logic relies on standard page loads now

// Scroll Reveal - Premium enter animation using IntersectionObserver
const revealElements = document.querySelectorAll('.glass-panel, .hero-content, .about-content, .section-title');

// Initialize base states
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
});

revealElements.forEach(el => revealObserver.observe(el));

// Skills section custom animations
const rightToLeftElements = document.querySelectorAll('.skills-heading, .dev-icons, .exp-text-div');
const leftToRightElements = document.querySelectorAll('.skills-image-div, .skills-bullets, .exp-image-div');

rightToLeftElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(100px)';
    el.style.transition = 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

leftToRightElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-100px)';
    el.style.transition = 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

const horizontalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

rightToLeftElements.forEach(el => horizontalObserver.observe(el));
leftToRightElements.forEach(el => horizontalObserver.observe(el));

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (themeToggle && currentTheme === 'light-theme') {
            themeToggle.innerHTML = '🌙';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('light-theme');
            
            let theme = 'dark-theme';
            if (body.classList.contains('light-theme')) {
                theme = 'light-theme';
                themeToggle.innerHTML = '🌙';
            } else {
                themeToggle.innerHTML = '☀️';
            }
            // Save preference
            localStorage.setItem('theme', theme);
        });
    }

    // Connect Project Cards to GitHub Stats
    async function fetchGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/Rajaboopathy-P/repos');
            if (!response.ok) return;
            const repos = await response.json();
            
            document.querySelectorAll('.github-stats').forEach(el => {
                const repoName = el.getAttribute('data-repo').toLowerCase();
                const repoData = repos.find(r => r.name.toLowerCase() === repoName);
                if (repoData) {
                    const starsCount = el.querySelector('.stars-count');
                    const forksCount = el.querySelector('.forks-count');
                    if (starsCount) starsCount.textContent = repoData.stargazers_count;
                    if (forksCount) forksCount.textContent = repoData.forks_count;
                }
            });
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
        }
    }
    
    // Call the fetch function
    fetchGitHubStats();
});
