document.addEventListener('DOMContentLoaded', function() {


    // Efeito de header que muda de cor ao rolar a página
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        }
    });


    // Menu hamburger para dispositivos móveis
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');


    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    document.querySelectorAll('.nav-menu a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
   
    // Animação de contagem para a seção de estatísticas
    const counters = document.querySelectorAll('.stat-counter');
    const statsSection = document.getElementById('stats');
    let hasAnimated = false;


    const startCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const increment = target / 100; // Velocidade da animação
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count).toLocaleString('pt-BR');
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString('pt-BR');
                }
            };
            updateCount();
        });
    };


    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });


    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    // Animação de entrada suave para seções
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });


    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });


});
