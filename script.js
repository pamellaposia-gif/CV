// ===== EFEITO DE DIGITAÇÃO =====
const roles = [
    'Analista Financeiro Sênior',
    'Estudante de ADS',
    'Apaixonada por tecnologia',
];

const typingEl = document.getElementById('typing');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const current = roles[roleIndex];
    typingEl.textContent = current.substring(0, charIndex);

    if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 90);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 45);
    } else {
        deleting = !deleting;
        if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, deleting ? 1800 : 400);
    }
}

type();

// ===== FOTO: mostra a inicial se a imagem não existir =====
const photo = document.getElementById('photo');
const photoFallback = document.getElementById('photoFallback');

function showFallback() {
    photo.style.display = 'none';
    photoFallback.style.display = 'flex';
}

photo.addEventListener('error', showFallback);
if (photo.complete && photo.naturalWidth === 0) showFallback();

// ===== TEMA CLARO / ESCURO =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// ===== MENU MOBILE =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.querySelector('i').className = navLinks.classList.contains('open')
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
});

function closeMenu() {
    navLinks.classList.remove('open');
    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
}

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', event => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(event.target) || menuBtn.contains(event.target)) return;
    closeMenu();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
});

// ===== SCROLL: navbar, barra de progresso, voltar ao topo, link ativo =====
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const menuLinks = navLinks.querySelectorAll('a');

function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
    navbar.classList.toggle('scrolled', scrollTop > 50);
    backToTop.classList.toggle('show', scrollTop > 500);

    let currentId = 'inicio';
    sections.forEach(section => {
        if (scrollTop >= section.offsetTop - 150) currentId = section.id;
    });

    menuLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', onScroll);
onScroll();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== ANIMAÇÃO AO APARECER NA TELA =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
    revealObserver.observe(el);
});

// ===== FILTRO DE PROJETOS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const show = filter === 'todos' || card.dataset.category === filter;
            card.classList.toggle('hide', !show);
        });
    });
});

// ===== BAIXAR PDF (impressão) =====
document.getElementById('printBtn').addEventListener('click', () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    window.print();
});

// ===== ANO NO RODAPÉ =====
document.getElementById('year').textContent = new Date().getFullYear();
