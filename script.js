document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DE NAVEGACIÓN PRINCIPAL DE BOTS ---
    const navItems = document.querySelectorAll('.bot-nav-item');
    const botCards = document.querySelectorAll('.bot-card-container');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const botId = item.dataset.bot;

            // Actualizar la clase activa en la navegación
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Mostrar la tarjeta del bot correspondiente
            botCards.forEach(card => {
                if (card.id === botId) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });

    // --- LÓGICA DE PESTAÑAS INTERNAS (PARA CADA FICHA) ---
    const allTabLinks = document.querySelectorAll('.tab-link');
    allTabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;
            const tabContainer = link.closest('.grid-col-right');

            // Desactivar links y contenidos activos dentro de la misma ficha
            tabContainer.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activar el link y contenido seleccionados
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- REPRODUCTOR DE MÚSICA (MODIFICADO PARA MÚLTIPLES CANCIONES) ---
    const playButtons = document.querySelectorAll('.play-pause-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const songId = btn.dataset.song;
            const audio = document.getElementById(songId);
            const icon = btn.querySelector('i');

            if (audio.paused) {
                // Pausar todas las demás canciones antes de reproducir la nueva
                document.querySelectorAll('audio').forEach(a => a.pause());
                document.querySelectorAll('.play-pause-btn i').forEach(i => i.className = 'fas fa-play');
                
                audio.play();
                icon.className = 'fas fa-pause';
            } else {
                audio.pause();
                icon.className = 'fas fa-play';
            }
        });
    });


    // --- Tus códigos existentes (preloader, sonidos, etc.) pueden ir aquí ---
    // (Asegúrate de adaptar los selectores si es necesario)
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

});
