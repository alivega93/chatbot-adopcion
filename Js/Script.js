
/* ===============================
   CHATBOT SIMPLE - JAVASCRIPT
================================ */

const responses = {
    'hola': {
        text: '¡Hola! Bienvenido a nuestro centro de adopción 🐾'
    },

    'quiero adoptar': {
        text: '¡Qué buena decisión! 💛 Aquí algunos de nuestros animales.',
        images: ['Img/ADOPCION.jpeg']
    },

    'como puedo adoptar': {
        text: 'Puedes adoptar llenando el formulario y agendando una visita.'
    },

    'que requisitos piden': {
        text: 'Ser mayor de edad, identificación oficial y compromiso de cuidado.'
    },

    'tienen perros': {
        text: 'Sí 🐶 tenemos perros de distintas edades y tamaños.',
        images: [
            'Img/PERRO.avif',
            'Img/perro2.jpg',
            'Img/perro3.jpg',
            'Img/perro4.jpg',
            'Img/perro5.jpg'
        ]
    },

    'tienen gatos': {
        text: 'Sí 🐱 tenemos gatos listos para adopción.',
        images: [
            'Img/GATO.jpg',
            'Img/gato2.webp',
            'Img/gato3.jpg',
            'Img/gato4.webp', 
            'Img/gato5.jpg.webp', 
        ]
    },

    'donde estan ubicados': {
        text: 'Nos encontramos en la Ciudad de México.'
    },

    'horarios': {
        text: 'Nuestro horario es de lunes a sábado de 10:00 a 18:00.'
    },

    'gracias': {
        text: '¡Gracias a ti por apoyar la adopción responsable! 💕'
    },

    'adios': {
        text: '¡Hasta pronto! Esperamos verte pronto 🐾'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const chatForm = document.getElementById('chatForm');

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function sendMessage() {
        const rawMessage = userInput.value.trim();
        if (rawMessage === '') return;

        addMessage({ text: rawMessage }, 'user');

        const message = normalizeText(rawMessage);

        const response = responses[message] || {
            text: 'No entendí tu pregunta 🤔. Puedes escribir: "hola", "tienen perros", "quiero adoptar".'
        };

        setTimeout(() => {
            addMessage(response, 'bot');
        }, 400);

        userInput.value = '';
    }

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        if (content.text) {
            const p = document.createElement('p');
            p.textContent = content.text;
            messageDiv.appendChild(p);
        }

        if (content.images) {
            const gallery = document.createElement('div');
            gallery.classList.add('image-gallery');

            content.images.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Animal disponible para adopción ${index + 1}`;
                gallery.appendChild(img);
            });

            messageDiv.appendChild(gallery);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendMessage();
    });
});
