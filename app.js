// Inicialización de Swiper para el banner superior
const topBannerSwiper = new Swiper('#top-banner .swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },
});

// Inicialización de Swiper para el hero
const heroSwiper = new Swiper('#inicio .swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '#inicio .swiper-pagination',
    },
    navigation: {
        nextEl: '#inicio .swiper-button-next',
        prevEl: '#inicio .swiper-button-prev',
    },
});

// Inicialización de Swiper para la galería
const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: '.gallery-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery-swiper .swiper-button-next',
        prevEl: '.gallery-swiper .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

// Funcionalidad del menú móvil
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.md\\:flex');

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
function handleReservation(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Validación de fechas
    const checkIn = new Date(formData.get('check-in'));
    const checkOut = new Date(formData.get('check-out'));
    
    if (checkOut <= checkIn) {
        alert('La fecha de salida debe ser posterior a la fecha de llegada.');
        return;
    }

    // Simulación de envío de datos
    console.log('Datos de reserva:', Object.fromEntries(formData));
    
    // Mostrar confirmación
    alert('¡Gracias por su reserva! Nos pondremos en contacto pronto para confirmar los detalles.');
    form.reset();
}

// Agregar el evento al formulario de reserva
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservation);
}

// Inicialización del mapa de Google
function initMap() {
    const hotelLocation = { lat: -31.6512, lng: -65.0074 }; // Coordenadas de ejemplo
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: hotelLocation,
    });
    const marker = new google.maps.Marker({
        position: hotelLocation,
        map: map,
        title: 'Hualhum Hotel'
    });
}

// Cambio de tema (claro/oscuro)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

// Notificaciones Push (requiere implementación del backend)
function subscribeToPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'TU_CLAVE_PUBLICA_VAPID'
            }).then(function(subscription) {
                console.log('Usuario suscrito:', subscription.toJSON());
                // Enviar la suscripción al servidor
            }).catch(function(error) {
                console.error('Error al suscribir al usuario:', error);
            });
        });
    }
}

// Remover el preloader cuando la página esté completamente cargada
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

// Llamar a esta función cuando el usuario acepte recibir notificaciones
// subscribeToPushNotifications();