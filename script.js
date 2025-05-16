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
            link: ""
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
        hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
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
        const emailInput = form.querySelector('#email');
        const nameInput = form.querySelector('#name');
        const messageInput = form.querySelector('#message');
        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback';
            form.appendChild(feedback);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            feedback.textContent = '';
            feedback.style.color = 'var(--secondary-color)';
            if (!nameInput.value.trim()) {
                feedback.textContent = 'Por favor, preencha seu nome.';
                feedback.style.color = 'red';
                return;
            }
            if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                feedback.textContent = 'Por favor, insira um e-mail válido.';
                feedback.style.color = 'red';
                return;
            }
            if (!messageInput.value.trim()) {
                feedback.textContent = 'Por favor, escreva sua mensagem.';
                feedback.style.color = 'red';
                return;
            }
            feedback.textContent = 'Formulário enviado com sucesso! (Esta é uma demonstração)';
            feedback.style.color = 'var(--secondary-color)';
            form.reset();
        });
    }
}

function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.textContent = "";
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

function animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');
    function checkTitles() {
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                title.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkTitles);
    window.addEventListener('load', checkTitles);
}

function setupThemeToggle() {
    let theme = localStorage.getItem('theme') || 'dark';
    const root = document.documentElement;
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn theme-toggle';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleBtn);

    function setTheme(t) {
        if (t === 'light') {
            root.style.setProperty('--primary-color', '#f5f5f5');
            root.style.setProperty('--secondary-color', '#181818');
            root.style.setProperty('--light-color', '#fff');
            root.style.setProperty('--dark-color', '#eaeaea');
            root.style.setProperty('--accent-color', '#181818');
            root.style.setProperty('--text-color', '#181818');
            root.style.setProperty('--text-secondary', '#555');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            root.style.setProperty('--primary-color', '#181818');
            root.style.setProperty('--secondary-color', '#EBDCC4');
            root.style.setProperty('--light-color', '#1E1E1E');
            root.style.setProperty('--dark-color', '#121212');
            root.style.setProperty('--accent-color', '#EBDCC4');
            root.style.setProperty('--text-color', '#EBDCC4');
            root.style.setProperty('--text-secondary', '#B0A99E');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', t);
    }
    setTheme(theme);

    toggleBtn.onclick = () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(theme);
    };
}

function showProjectsLoading() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '<div class="portfolio-loading">Carregando projetos...</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showProjectsLoading();
    setTimeout(() => {
        loadProjects();
        animatePortfolioItems();
    }, 500);
    loadSocialLinks();
    setupMobileMenu();
    setupSmoothScroll();
    updateCopyrightYear();
    setupContactForm();
    animateSectionTitles();
    setupThemeToggle();

    const h1 = document.querySelector('.profile-header h1');
    if (h1) typeWriter(h1, "Otávio Katibe");
});

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    backToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
}

window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});
document.getElementById('backToTop').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

