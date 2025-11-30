// ===== FUNCIONALIDAD BOTÓN SCROLL TO TOP =====
const scrollTopButton = document.getElementById('scrollTop');

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

// Funcionalidad de scroll suave al inicio
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== NAVEGACIÓN SUAVE =====
// Seleccionar todos los enlaces de navegación
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Obtener el destino del enlace
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Scroll suave a la sección
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIÓN DE ENTRADA PARA SECCIONES =====
// Observador de intersección para animar elementos cuando entran en vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== HIGHLIGHT MENÚ ACTIVO =====
// Destacar el enlace del menú correspondiente a la sección visible
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===== CONTADOR DE PASOS =====
// Agregar números a los pasos
const pasos = document.querySelectorAll('.paso');
pasos.forEach((paso, index) => {
    const numero = index + 1;
    paso.setAttribute('data-step', numero);
});

// ===== EFECTO HOVER EN IMÁGENES =====
const imagenes = document.querySelectorAll('.paso-imagen');

imagenes.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05) rotate(1deg)';
        img.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
        img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
});

// ===== ANIMACIÓN DE INGREDIENTES =====
const ingredientesItems = document.querySelectorAll('.ingredientes-lista li');

ingredientesItems.forEach((item, index) => {
    // Animación de entrada escalonada
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 100);

    // Estado inicial
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// ===== EFECTO PARALLAX EN HEADER =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPosition = window.pageYOffset;

    if (header && scrollPosition < 500) {
        header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        header.style.opacity = 1 - (scrollPosition / 500);
    }
});

// ===== MENSAJE DE BIENVENIDA =====
window.addEventListener('load', () => {
    console.log('🍌 Bienvenido al Tutorial de Arepas de Plátano Maduro');
    console.log('📝 Proyecto: GA6-220501096-AA4-EV01');
    console.log('💻 Componentes: HTML, CSS, JavaScript');

    // Mostrar un mensaje temporal
    const mensaje = document.createElement('div');
    mensaje.innerHTML = '¡Bienvenido! 🍌 Disfruta del tutorial';
    mensaje.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(mensaje);

    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => mensaje.remove(), 500);
    }, 3000);
});

// ===== AGREGAR ESTILOS DE ANIMACIÓN =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    nav a.active {
        background-color: #ff6b6b;
        color: white;
        border-bottom-color: #ee5a6f;
    }
`;
document.head.appendChild(style);

// ===== CONTADOR DE TIEMPO EN PÁGINA =====
let startTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    console.log(`⏱️ Tiempo en la página: ${timeSpent} segundos`);
});

// ===== VALIDACIÓN DE IMÁGENES =====
// Manejar errores de carga de imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent && parent.classList.contains('paso-content')) {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                background: linear-gradient(135deg, #ffeaa7 0%, #fff 100%);
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                color: #666;
                font-style: italic;
            `;
            placeholder.textContent = '📸 Coloca aquí tu imagen del paso';
            parent.insertBefore(placeholder, this);
        }
    });
});

console.log('✅ JavaScript cargado correctamente');