/**
 * GALLERY-CAROUSEL.JS - Funcionalidad para carruseles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    initCarousels();
});

function initCarousels() {
    const carousels = document.querySelectorAll('.wp-block-gallery.is-style-carousel-with-controls');

    carousels.forEach((carousel, index) => {
        const galleryGrid = carousel;
        const items = carousel.querySelectorAll('.wp-block-image');
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);
        
        // Crear indicadores
        if (indicatorsContainer) {
            items.forEach((_, i) => {
                const indicator = document.createElement('button');
                indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => goToSlide(i));
                indicatorsContainer.appendChild(indicator);
            });
        }
        
        // Función para mover carrusel
        function goToSlide(index) {
            currentIndex = index;
            const translateX = -currentIndex * itemWidth;
            galleryGrid.style.transform = `translateX(${translateX}px)`;
            
            // Actualizar indicadores
            updateIndicators();
        }
        
        // Actualizar indicadores activos
        function updateIndicators() {
            const indicators = carousel.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Navegación anterior
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                goToSlide(currentIndex);
            });
        }
        
        // Navegación siguiente
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
            });
        }
        
        // Auto-play opcional
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
            }, 5000); // Cambia cada 5 segundos
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Iniciar auto-play
        startAutoPlay();
        
        // Pausar auto-play al interactuar
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    });
}

// Carrusel táctil para móviles
function initTouchCarousel() {
    const carousels = document.querySelectorAll('.wp-block-gallery.is-style-carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}