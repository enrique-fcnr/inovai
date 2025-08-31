document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');
    
    // --- Navbar Sticky with Transparency ---
    function toggleNavbarBackground() {
        if (window.scrollY > 50) { // Adiciona fundo após 50px de scroll
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    }
    window.addEventListener('scroll', toggleNavbarBackground);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const logoContainer = document.querySelector('.logo-scroll-container');
    const logoScroll = document.querySelector('.logo-scroll');
    
    // Revertendo para o comportamento original
    logoContainer.addEventListener('mouseenter', () => {
        logoScroll.style.animationPlayState = 'paused';
    });
    logoContainer.addEventListener('mouseleave', () => {
        logoScroll.style.animationPlayState = 'running';
    });

    const glowCanvas = document.getElementById('glow-canvas');
    const glowCtx = glowCanvas.getContext('2d');
    let canvasWidth, canvasHeight;

    const glows = [];
    const numGlows = 15;

    function resizeGlowCanvas() {
        canvasWidth = glowCanvas.width = glowCanvas.offsetWidth;
        canvasHeight = glowCanvas.height = glowCanvas.offsetHeight;
    }

    class Glow {
        constructor() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.radius = Math.random() * 50 + 20;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.1 + 0.05;
            this.color = `rgba(147, 51, 234, ${this.opacity})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reverter direção ao atingir as bordas
            if (this.x > canvasWidth || this.x < 0) this.speedX *= -1;
            if (this.y > canvasHeight || this.y < 0) this.speedY *= -1;
        }

        draw() {
            glowCtx.beginPath();
            glowCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            glowCtx.fillStyle = this.color;
            glowCtx.shadowColor = this.color;
            glowCtx.shadowBlur = this.radius / 2;
            glowCtx.fill();
        }
    }

    function initGlows() {
        glows.length = 0;
        for (let i = 0; i < numGlows; i++) {
            glows.push(new Glow());
        }
    }

    function animateGlows() {
        glowCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        glowCtx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < glows.length; i++) {
            glows[i].update();
            glows[i].draw();
        }

        requestAnimationFrame(animateGlows);
    }

    window.addEventListener('resize', () => {
        resizeGlowCanvas();
        initGlows();
    });

    resizeGlowCanvas();
    initGlows();
    animateGlows();
    
    // Código para a nova animação de constelação
    const constellationCanvas = document.getElementById('constellation-canvas');
    const constellationCtx = constellationCanvas.getContext('2d');
    let constellationWidth, constellationHeight;
    const points = [];
    const numPoints = 40; // Diminuído para um efeito mais sutil
    const connectDistance = 200; // Aumentado para espaçar mais as linhas

    function resizeConstellationCanvas() {
        constellationWidth = constellationCanvas.width = window.innerWidth;
        constellationHeight = constellationCanvas.height = window.innerHeight;
    }

    class Point {
        constructor() {
            this.x = Math.random() * constellationWidth;
            this.y = Math.random() * constellationHeight;
            this.radius = Math.random() * 1.5 + 0.5; // Raio menor para pontos mais sutis
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop de volta à tela
            if (this.x < 0) this.x = constellationWidth;
            if (this.x > constellationWidth) this.x = 0;
            if (this.y < 0) this.y = constellationHeight;
            if (this.y > constellationHeight) this.y = 0;
        }

        draw() {
            constellationCtx.beginPath();
            constellationCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            constellationCtx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Opacidade reduzida
            constellationCtx.fill();
        }
    }

    function initPoints() {
        points.length = 0;
        for (let i = 0; i < numPoints; i++) {
            points.push(new Point());
        }
    }

    function connectPoints() {
        for (let i = 0; i < numPoints; i++) {
            for (let j = i + 1; j < numPoints; j++) {
                const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
                if (dist < connectDistance) {
                    const opacity = (1 - (dist / connectDistance)) * 0.2; // Opacidade reduzida para as linhas
                    constellationCtx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
                    constellationCtx.lineWidth = 0.5;
                    constellationCtx.beginPath();
                    constellationCtx.moveTo(points[i].x, points[i].y);
                    constellationCtx.lineTo(points[j].x, points[j].y);
                    constellationCtx.stroke();
                }
            }
        }
    }

    function animateConstellation() {
        constellationCtx.clearRect(0, 0, constellationWidth, constellationHeight);
        connectPoints();
        for (const point of points) {
            point.update();
            point.draw();
        }
        requestAnimationFrame(animateConstellation);
    }

    window.addEventListener('resize', () => {
        resizeConstellationCanvas();
        initPoints();
    });

    resizeConstellationCanvas();
    initPoints();
    animateConstellation();
});