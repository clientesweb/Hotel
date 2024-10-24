// Inicialización de Swiper para el banner superior
const topBannerSwiper = new Swiper('#top-banner .swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// Inicialización de Swiper para el hero
const heroSwiper = new Swiper('.hero-swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// Inicialización de Swiper para las reseñas
const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Funcionalidad del menú móvil
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading para imágenes
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Función para manejar las reservas
function handleReservation(room) {
    const message = encodeURIComponent(`Hola, me gustaría reservar la ${room} en el Hotel Hualum. ¿Podrían proporcionarme más información sobre disponibilidad y precios?`);
    window.open(`https://wa.me/5491112345678?text=${message}`, '_blank');
}

// Agregar el evento a los botones de reserva
document.querySelectorAll('.reserve-room').forEach(button => {
    button.addEventListener('click', function() {
        const room = this.getAttribute('data-room');
        handleReservation(room);
    });
});

// Agregar funcionalidad para el modal de imágenes de habitaciones
const modal = document.getElementById("roomModal");
const modalImg = document.getElementById("roomImage");
const roomImages = document.querySelectorAll(".room-image");
const closeBtn = document.getElementsByClassName("close")[0];

roomImages.forEach(img => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Inicialización del mapa de Google
function initMap() {
    const hotelLocation = { lat: -31.6512, lng: -65.0074 }; // Coordenadas de ejemplo
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: hotelLocation,
        styles: [
            {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [
                    { hue: "#1e3a8a" },
                    { saturation: 50 },
                    { lightness: 10 }
                ]
            }
        ]
    });
    const marker = new google.maps.Marker({
        position: hotelLocation,
        map: map,
        title: 'Hotel Hualum'
    });
}

// Cambio de tema (claro/oscuro)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcon();
    });

    // Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    // Actualizar icono del tema
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    updateThemeIcon();
}

// Remover el preloader cuando la página esté completamente cargada
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Efecto de scroll para el header
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});