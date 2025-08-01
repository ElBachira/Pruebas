document.addEventListener('DOMContentLoaded', function() {

    const preloader = document.getElementById('preloader');
    const botShowcase = document.querySelector('.bot-showcase');
    const characterIcons = document.querySelectorAll('.char-icon');

    // --- FUNCIÓN PRINCIPAL PARA CARGAR BOTS ---
    function loadBot(botId) {
        // Ocultar el contenido actual con una animación
        botShowcase.style.opacity = 0;

        // Buscar el template del bot
        const template = document.getElementById(`bot-template-${botId}`);
        if (!template) {
            console.error(`No se encontró el template para el bot: ${botId}`);
            botShowcase.innerHTML = `<p>Error: Bot no encontrado.</p>`;
            botShowcase.style.opacity = 1;
            return;
        }

        // Clonar el contenido y añadirlo al showcase
        const newContent = template.content.cloneNode(true);

        setTimeout(() => {
            botShowcase.innerHTML = '';
            botShowcase.appendChild(newContent);
            
            // Re-inicializar los listeners de eventos para el nuevo contenido
            initializeBotEventListeners();

            // Mostrar el nuevo contenido con una animación
            botShowcase.style.opacity = 1;

        }, 300); // Esperar a que la animación de fade-out termine

        // Actualizar el icono activo
        characterIcons.forEach(icon => {
            icon.classList.toggle('active', icon.dataset.bot === botId);
        });
    }

    // --- EVENT LISTENERS PARA LA SELECCIÓN DE PERSONAJES ---
    characterIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const botId = icon.dataset.bot;
            loadBot(botId);
        });
    });

    // --- FUNCIÓN PARA INICIALIZAR LISTENERS DENTRO DEL BOT CARGADO ---
    function initializeBotEventListeners() {
        // --- REPRODUCTOR DE MÚSICA ---
        const player = botShowcase.querySelector('.music-player');
        if (player) {
            const audio = player.querySelector('.song-audio');
            const playPauseBtn = player.querySelector('.play-pause-btn');
            const albumArt = player.querySelector('.album-art');
            const playIcon = '<i class="fas fa-play"></i>';
            const pauseIcon = '<i class="fas fa-pause"></i>';

            playPauseBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    playPauseBtn.innerHTML = pauseIcon;
                    albumArt.style.animation = 'spin 4s linear infinite';
                } else {
                    audio.pause();
                    playPauseBtn.innerHTML = playIcon;
                    albumArt.style.animation = 'none';
                }
            });
            audio.addEventListener('ended', () => {
                playPauseBtn.innerHTML = playIcon;
                albumArt.style.animation = 'none';
            });
        }
        
        // --- BOTÓN DE COPIAR LINK ---
        const copyBtn = botShowcase.querySelector('.copy-link-btn');
        if (copyBtn) {
            const originalBtnText = copyBtn.innerHTML;
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado';
                    copyBtn.style.background = 'var(--color-secondary)';
                    copyBtn.style.color = 'var(--color-bg)';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalBtnText;
                        copyBtn.style.background = '';
                        copyBtn.style.color = '';
                    }, 2000);
                });
            });
        }
    }


    // --- CARGA INICIAL ---
    window.addEventListener('load', () => {
        // Ocultar preloader
        preloader.classList.add('loaded');
        
        // Cargar el primer bot por defecto
        const defaultBot = document.querySelector('.char-icon.active')?.dataset.bot || 'bom-seok';
        loadBot(defaultBot);
    });

});
