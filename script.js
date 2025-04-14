const portfolioData = {
    projects: [
        {
            id: 1,
            title: "Gerador de Ticket",
            description: "Gerador de ticket desenvolvido como atividade pontuada em Desenvolvimento Fullstack",
            image: "https://ticket-one-amber.vercel.app/",
            link: "https://github.com/otvkatibe/ticket"
        },
        {
            id: 2,
            title: "Calculadora de Idade",
            description: "Calculadora de idade desenvolvida como atividade pontuada em Desenvolvimento Fullstack",
            image: "https://calculadora-puce-rho.vercel.app/",
            link: "https://github.com/otvkatibe/calculadora"
        },
        {
            id: 3,
            title: "Xadrez",
            description: "Projeto em equipe de Xadrez em Java, programação orientada a objetos",
            image: "",
            link: "https://github.com/otvkatibe/poo_xadrez"
        },
        {
            id: 4,
            title: "Riot - Lol Stats",
            description: "Projeto em equipe de Fullstack em javascript, react + vite, com a intenção de demonstrar o perfil",
            image: "https://riot-frontend-lime.vercel.app/",
            link: "https://github.com/otvkatibe/riot-frontend"
        }
    ],
    socialLinks: [
        { icon: "fab fa-github", url: "https://github.com/otvkatibe" },
        { icon: "fab fa-instagram", url: "https://www.instagram.com/otvkatibe?igsh=MWljazEwemRpZ3hnag==" },
    ]
};

function loadProjects() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioData.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        
        const projectLink = project.link ? 
            `<a href="${project.link}" class="btn" target="_blank" rel="noopener noreferrer">Ver Projeto</a>` : 
            '<button class="btn disabled">Em breve</button>';
        
        projectElement.innerHTML = `
            <div class="portfolio-img" style="background-image: url('${project.image}')"></div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-desc">${project.description}</p>
                ${projectLink}
            </div>
        `;
        portfolioGrid.appendChild(projectElement);
    });
}

function loadSocialLinks() {
    const socialLinks = document.querySelector('.social-links');
    
    portfolioData.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerHTML = `<i class="${link.icon}"></i>`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        socialLinks.appendChild(a);
    });
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('http')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

function updateCopyrightYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

function animatePortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    const animateOnScroll = () => {
        portfolioItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulário enviado com sucesso! (Esta é uma demonstração)');
            form.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSocialLinks();
    setupMobileMenu();
    setupSmoothScroll();
    updateCopyrightYear();
    animatePortfolioItems();
    setupContactForm();
});
