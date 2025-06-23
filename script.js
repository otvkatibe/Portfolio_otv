const portfolioData = {
    projects: [
        {
            id: 1,
            title: "Gerador de Ticket",
            description: "Aplicação web para geração de tickets de eventos desenvolvida como atividade pontuada em Desenvolvimento Fullstack. Interface moderna e responsiva com funcionalidades de customização.",
            link: "https://github.com/otvkatibe/ticket",
            demo: "https://ticket-one-amber.vercel.app/",
            tags: ["JavaScript", "HTML", "CSS", "Web"],
            category: "web"
        },
        {
            id: 2,
            title: "Calculadora de Idade",
            description: "Calculadora interativa que calcula a idade exata em anos, meses e dias. Desenvolvida com foco em UX/UI moderno e validação de dados robusta.",
            link: "https://github.com/otvkatibe/calculadora",
            demo: "https://calculadora-puce-rho.vercel.app/",
            tags: ["JavaScript", "HTML", "CSS", "Web"],
            category: "web"
        },
        {
            id: 4,
            title: "Riot - LoL Stats",
            description: "Aplicação fullstack para visualização de estatísticas de League of Legends. Desenvolvida em equipe usando React + Vite no frontend e integração com API da Riot Games.",
            link: "https://github.com/otvkatibe/riot-frontend",
            demo: "https://riot-frontend-tcss.vercel.app/",
            tags: ["React", "Vite", "API", "JavaScript"],
            category: "web"
        },
        {
            id: 6,
            title: "Crud Autenticado MongoDB",
            description: "API RESTful robusta desenvolvida em Node.js com Express, incluindo autenticação JWT, validação de dados e documentação completa com Swagger.",
            link: "https://github.com/otvkatibe/CRUD-autenticado-mongodb",
            demo: "https://crud-area-login-cadastro.vercel.app/login",
            tags: ["Node.js", "Express", "JWT", "MongoDB"],
            category: "web"
        }
    ],
    socialLinks: [
        { 
            icon: "fab fa-github", 
            url: "https://github.com/otvkatibe",
            label: "GitHub"
        },
        { 
            icon: "fab fa-instagram", 
            url: "https://www.instagram.com/katibeotavio",
            label: "Instagram"
        }
    ]
};

// Estado da aplicação
const appState = {
    currentFilter: 'all',
    isMenuOpen: false,
    isDarkTheme: true,
    isLoading: false
};

// Utilitários
const utils = {
    // Debounce para otimizar performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Intersection Observer para animações
    createObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    },

    // Smooth scroll personalizado
    smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
};

// Gerenciamento de projetos
const projectManager = {
    loadProjects() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;

        // Limpar grid
        portfolioGrid.innerHTML = '';

        // Filtrar projetos
        const filteredProjects = appState.currentFilter === 'all' 
            ? portfolioData.projects 
            : portfolioData.projects.filter(project => project.category === appState.currentFilter);

        // Criar elementos dos projetos
        filteredProjects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            portfolioGrid.appendChild(projectElement);
        });

        // Animar entrada dos projetos
        this.animateProjects();
    },

    createProjectElement(project, index) {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.setAttribute('data-category', project.category);
        
        const demoLink = project.demo ? 
            `<a href="${project.demo}" class="btn" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> Ver Demo
            </a>` : '';
        
        const githubLink = project.link ? 
            `<a href="${project.link}" class="btn" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> Código
            </a>` : '';

        const tags = project.tags.map(tag => 
            `<span class="portfolio-tag">${tag}</span>`
        ).join('');

        projectElement.innerHTML = `
            <div class="portfolio-img" style="background-image: url('${project.image}')">
                <div class="portfolio-overlay">
                    <div class="portfolio-actions">
                        ${demoLink}
                        ${githubLink}
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-desc">${project.description}</p>
                <div class="portfolio-tags">
                    ${tags}
                </div>
            </div>
        `;

        // Adicionar delay para animação escalonada
        projectElement.style.animationDelay = `${index * 0.1}s`;

        return projectElement;
    },

    animateProjects() {
        const projects = document.querySelectorAll('.portfolio-item');
        
        const observer = utils.createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        projects.forEach(project => {
            observer.observe(project);
        });
    },

    filterProjects(category) {
        appState.currentFilter = category;
        
        // Atualizar botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${category}"]`).classList.add('active');

        // Recarregar projetos
        this.loadProjects();
    }
};

// Gerenciamento de navegação
const navigationManager = {
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupScrollEffects();
    },

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            appState.isMenuOpen = !appState.isMenuOpen;
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                appState.isMenuOpen = false;
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                appState.isMenuOpen = false;
            }
        });
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                utils.smoothScrollTo(targetId);
            });
        });
    },

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        const observer = utils.createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
            observer.observe(section);
        });
    },

    setupScrollEffects() {
        const nav = document.querySelector('nav');
        const backToTop = document.getElementById('backToTop');
        
        const handleScroll = utils.debounce(() => {
            const scrollY = window.scrollY;
            
            // Efeito da navegação
            if (scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
                nav.style.backdropFilter = 'blur(20px)';
            }
            
            // Botão voltar ao topo
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);
        
        // Configurar botão voltar ao topo
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                utils.smoothScrollTo('#home');
            });
        }
    }
};

// Gerenciamento de tema
const themeManager = {
    init() {
        this.loadTheme();
        this.setupThemeToggle();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            appState.isDarkTheme = savedTheme === 'dark';
        }
        this.applyTheme();
    },

    applyTheme() {
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle i');
        
        if (appState.isDarkTheme) {
            body.classList.remove('light-theme');
            if (themeToggle) themeToggle.className = 'fas fa-sun';
        } else {
            body.classList.add('light-theme');
            if (themeToggle) themeToggle.className = 'fas fa-moon';
        }
        
        localStorage.setItem('portfolio-theme', appState.isDarkTheme ? 'dark' : 'light');
    },

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            appState.isDarkTheme = !appState.isDarkTheme;
            this.applyTheme();
        });
    }
};

// Gerenciamento de formulário
const formManager = {
    init() {
        this.setupContactForm();
    },

    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('button[type="submit"]');
        const feedback = form.querySelector('.form-feedback');

        // Validação em tempo real
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Submissão do formulário
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form, submitBtn, feedback);
        });
    },

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Remover classes de erro anteriores
        field.classList.remove('error');

        // Validações específicas
        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Nome é obrigatório';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email é obrigatório';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Email inválido';
                }
                break;
            
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Mensagem é obrigatória';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                }
                break;
        }

        // Aplicar estilo de erro se necessário
        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    },

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    showFieldError(field, message) {
        this.clearFieldError(field);
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    },

    async handleFormSubmit(form, submitBtn, feedback) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validar todos os campos
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFeedback(feedback, 'Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Simular envio
        this.setLoadingState(submitBtn, true);
        
        try {
            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simular sucesso (em produção, aqui seria a chamada real da API)
            this.showFeedback(feedback, 'Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            form.reset();
            
        } catch (error) {
            this.showFeedback(feedback, 'Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    },

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            button.classList.remove('loading');
        }
    },

    showFeedback(feedbackElement, message, type) {
        if (!feedbackElement) return;
        
        feedbackElement.textContent = message;
        feedbackElement.className = `form-feedback ${type}`;
        feedbackElement.style.color = type === 'success' ? '#10b981' : '#ef4444';
        
        // Remover feedback após 5 segundos
        setTimeout(() => {
            feedbackElement.textContent = '';
            feedbackElement.className = 'form-feedback';
        }, 5000);
    }
};

// Animações e efeitos visuais
const animationManager = {
    init() {
        this.setupScrollReveal();
        this.setupTypewriter();
        this.setupParallax();
    },

    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.section-title, .about-text, .timeline-item, .contact-method');
        
        const observer = utils.createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'active');
                }
            });
        });

        revealElements.forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    },

    setupTypewriter() {
        const titleElement = document.querySelector('.profile-info h1');
        if (!titleElement) return;

        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar typewriter após um pequeno delay
        setTimeout(typeWriter, 500);
    },

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        const handleScroll = utils.debounce(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }
};

// Gerenciamento de performance
const performanceManager = {
    init() {
        this.setupLazyLoading();
        this.preloadCriticalResources();
    },

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = utils.createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    },

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
};

// Inicialização da aplicação
class PortfolioApp {
    constructor() {
        this.init();
    }

    async init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        try {
            // Inicializar todos os gerenciadores
            navigationManager.init();
            themeManager.init();
            formManager.init();
            animationManager.init();
            performanceManager.init();
            
            // Carregar conteúdo
            this.loadContent();
            
            // Configurar filtros de projeto
            this.setupProjectFilters();
            
            // Atualizar ano no footer
            this.updateCopyrightYear();
            
            console.log('Portfolio carregado com sucesso!');
            
        } catch (error) {
            console.error('Erro ao inicializar portfolio:', error);
        }
    }

    loadContent() {
        // Carregar projetos
        projectManager.loadProjects();
        
        // Carregar links sociais
        this.loadSocialLinks();
    }

    loadSocialLinks() {
        const socialContainers = document.querySelectorAll('.social-links');
        
        socialContainers.forEach(container => {
            // Limpar container
            container.innerHTML = '';
            
            // Adicionar links sociais
            portfolioData.socialLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.innerHTML = `<i class="${link.icon}"></i>`;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.setAttribute('aria-label', link.label);
                container.appendChild(a);
            });
        });
    }

    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                projectManager.filterProjects(filter);
            });
        });
    }

    updateCopyrightYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Inicializar aplicação
const app = new PortfolioApp();

// Exportar para uso global se necessário
window.PortfolioApp = PortfolioApp;
window.portfolioData = portfolioData;

