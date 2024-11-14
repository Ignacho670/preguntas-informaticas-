let currentQuestion = 0;
let score = 0;
const initialTimeLimit = 25; // Tiempo inicial del juego en segundos
let timeLeft = initialTimeLimit;
let timerInterval;


// Función para iniciar el temporizador global del juego
function startGameTimer() {
   const animatedClock = document.querySelector(".animated-clock");
   const clockHand = document.querySelector(".clock-hand");


   // Asegurarse de que la animación esté activa al inicio
   animatedClock.classList.remove("paused");
   clockHand.classList.remove("paused");


   timerInterval = setInterval(() => {
       timeLeft--;
       document.getElementById("timer").innerText = `Tiempo restante: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;


       if (timeLeft <= 0) {
           clearInterval(timerInterval);
           endGame(); // Detener el juego cuando el tiempo se acaba
       }
   }, 1000);
}


// Función para cargar la pregunta actual
function loadQuestion() {
   if (currentQuestion < questions.length) {
       document.getElementById("question-text").innerText = questions[currentQuestion].question;


       const options = questions[currentQuestion].options.slice();
       shuffle(options);


       const buttons = document.querySelectorAll(".option-button");
       buttons.forEach((btn, index) => {
           btn.innerText = options[index];
           btn.disabled = false;
           btn.classList.remove("correct", "incorrect", "correct-bounce", "incorrect-fade"); // Eliminar animaciones anteriores
           btn.style.cursor = "pointer";
           btn.onclick = () => checkAnswer(btn, options[index]);
       });


       const resultDiv = document.getElementById("result");
       resultDiv.innerText = "";
       resultDiv.style.opacity = 0;
   } else {
       endGame();
   }
}


// Función para verificar si la respuesta es correcta
function checkAnswer(selectedButton, selectedOption) {
   const buttons = document.querySelectorAll(".option-button");
   const correctAnswerIndex = questions[currentQuestion].correct;
   const correctAnswer = questions[currentQuestion].options[correctAnswerIndex];


   buttons.forEach(btn => btn.disabled = true);


   if (selectedOption === correctAnswer) {
       selectedButton.classList.add("correct", "correct-bounce"); // Agregar la animación de rebote solo cuando se responde correctamente
       score++;
       timeLeft += 5; // Incrementar el tiempo en 5 segundos si la respuesta es correcta
   } else {
       selectedButton.classList.add("incorrect", "incorrect-fade"); // Animación de desvanecimiento solo para incorrectas
       buttons.forEach(btn => {
           if (btn.innerText === correctAnswer) {
               btn.classList.add("correct");
           }
       });
   }


   currentQuestion++;
   setTimeout(() => {
       loadQuestion();
   }, 1000);
}


// Función para finalizar el juego
function endGame() {
   clearInterval(timerInterval);
   document.getElementById("question-text").innerText = "¡Juego terminado!";
   document.querySelector(".options").style.display = "none";


   // Detener la animación del reloj y la manecilla
   const animatedClock = document.querySelector(".animated-clock");
   const clockHand = document.querySelector(".clock-hand");
   animatedClock.classList.add("paused");  // Detener la animación del fondo
   clockHand.classList.add("paused"); // Detener la animación de la manecilla


   const resultDiv = document.getElementById("result");
   resultDiv.innerText = `Tu puntuación final es: ${score}/${questions.length}`;
   resultDiv.style.opacity = 1;


   const restartButton = document.getElementById("restart-button");
   restartButton.style.display = "block"; // Mostrar el botón de reinicio
}


// Función para reiniciar el juego
function restartGame() {
   // Resetear todo
   clearInterval(timerInterval); // Detener cualquier temporizador en ejecución
   timeLeft = initialTimeLimit;
   currentQuestion = 0;
   score = 0;


   // Eliminar las animaciones previas de las opciones
   const buttons = document.querySelectorAll(".option-button");
   buttons.forEach((btn) => {
       btn.classList.remove("correct", "incorrect", "correct-bounce", "incorrect-fade");
   });


   document.getElementById("result").style.opacity = 0;
   document.querySelector(".options").style.display = "block";
   document.getElementById("restart-button").style.display = "none";


   startGameTimer(); // Reiniciar el temporizador
   loadQuestion(); // Cargar la primera pregunta
}


// Evento para iniciar el juego
document.getElementById("start-button").addEventListener("click", () => {
   document.getElementById("intro-screen").classList.add("hidden");
   document.getElementById("game-container").classList.remove("hidden");
   shuffle(questions);
   startGameTimer();
   loadQuestion();
});


// Evento para reiniciar el juego
document.getElementById("restart-button").addEventListener("click", restartGame);


// Función auxiliar para mezclar el array de opciones
function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
}


//30 pregunta sobre seguridad informática
const questions = [
   { question: "¿Qué es un firewall?", options: ["Un programa antivirus", "Un sistema que filtra tráfico de red", "Un tipo de virus informático", "Un tipo de criptografía"], correct: 1 },
   { question: "¿Qué es phishing?", options: ["Un ataque que involucra engaño para robar datos", "Un tipo de malware que secuestra el sistema", "Una técnica de encriptación", "Una red de computadoras infectadas"], correct: 0 },
   { question: "¿Cuál es la mejor práctica para crear contraseñas?", options: ["Usar la misma contraseña en todos los sitios", "Usar una contraseña corta y fácil de recordar", "Usar combinaciones de letras, números y símbolos", "Usar solo tu nombre como contraseña"], correct: 2 },
   { question: "¿Qué es un ataque de fuerza bruta?", options: ["Un intento de adivinar contraseñas probando combinaciones", "Una técnica de encriptación avanzada", "Un virus que se disfraza de otro archivo", "Una técnica para asegurar redes WiFi"], correct: 0 },
   { question: "¿Qué significa VPN?", options: ["Virus Protection Network", "Virtual Private Network", "Video Protocol Network", "Verified Password Node"], correct: 1 },
   { question: "¿Cuál es la función de un antivirus?", options: ["Crear copias de seguridad de archivos", "Filtrar el tráfico de internet", "Detectar y eliminar software malicioso", "Optimizar el rendimiento del sistema"], correct: 2 },
   { question: "¿Qué es el malware?", options: ["Software diseñado para dañar un sistema", "Un tipo de firewall", "Una técnica de ingeniería social", "Una configuración de red segura"], correct: 0 },
   { question: "¿Cuál es una buena práctica para evitar el phishing?", options: ["Compartir información personal en correos electrónicos", "Verificar enlaces antes de hacer clic", "Usar contraseñas cortas", "Ignorar actualizaciones de software"], correct: 1 },
   { question: "¿Qué es el hashing?", options: ["Una técnica para cifrar datos", "Un método de autenticación", "Un proceso para asegurar contraseñas", "Un programa para eliminar virus"], correct: 2 },
   { question: "¿Qué es una VPN?", options: ["Una red privada virtual", "Un tipo de antivirus", "Una herramienta de hacking", "Un malware que ataca redes"], correct: 0 },
   { question: "¿Qué es el ransomware?", options: ["Un malware que bloquea archivos hasta recibir un pago", "Una técnica de ingeniería social", "Un firewall de alta seguridad", "Un ataque que secuestra redes WiFi"], correct: 0 },
   { question: "¿Qué hace un certificado SSL?", options: ["Protege las comunicaciones entre el navegador y el servidor", "Cifra todos los datos en un disco duro", "Permite acceso remoto seguro a la red", "Proporciona copias de seguridad de seguridad"], correct: 0 },
   { question: "¿Qué es un exploit?", options: ["Una herramienta para actualizar software", "Un programa que aprovecha una vulnerabilidad", "Un virus que afecta solo a dispositivos móviles", "Un método para fortalecer la seguridad"], correct: 1 },
   { question: "¿Qué es la autenticación de dos factores (2FA)?", options: ["Un proceso para borrar virus", "Un tipo de ataque de red", "Un sistema que requiere dos formas de verificación", "Una técnica de cifrado avanzada"], correct: 2 },
   { question: "¿Qué es el sniffing?", options: ["Un proceso de cifrado de datos", "Un ataque para interceptar tráfico de red", "Un tipo de malware", "Un método para optimizar redes"], correct: 1 },
   { question: "¿Qué significa DoS en seguridad informática?", options: ["Descarga de software", "Denegación de servicio", "Detección de spyware", "Desencriptación de sistemas"], correct: 1 },
   { question: "¿Qué es el spear phishing?", options: ["Un ataque dirigido a individuos específicos", "Un malware que infecta redes sociales", "Un tipo de criptografía", "Un ataque para instalar antivirus"], correct: 0 },
   { question: "¿Cuál es el objetivo de un pentesting?", options: ["Buscar vulnerabilidades en un sistema", "Cifrar los datos sensibles", "Proteger las conexiones de red", "Eliminar virus del sistema"], correct: 0 },
   { question: "¿Qué significa el término 'backdoor'?", options: ["Una contraseña temporal", "Una vulnerabilidad en el sistema", "Un método de acceso oculto", "Un tipo de virus"], correct: 2 },
   { question: "¿Qué es el spyware?", options: ["Un software que espía la actividad del usuario", "Un firewall avanzado", "Un método de autenticación", "Un antivirus"], correct: 0 },
   { question: "¿Cuál es la función de una firma digital?", options: ["Garantizar la autenticidad de un documento", "Eliminar virus del sistema", "Optimizar el rendimiento de la red", "Filtrar correos electrónicos"], correct: 0 },
   { question: "¿Qué es un ataque de ingeniería social?", options: ["Un ataque que utiliza la manipulación psicológica", "Un malware que se propaga en redes sociales", "Un firewall especializado", "Un ataque que modifica archivos en el servidor"], correct: 0 },
   { question: "¿Qué significa HTTPS?", options: ["Hypertext Transfer Protocol Secure", "Hyper Transfer Protocol Security", "Hypertext Transfer Private Server", "Hyper Tool Protocol Security"], correct: 0 },
   { question: "¿Qué es un keylogger?", options: ["Un programa que registra las pulsaciones del teclado", "Un firewall avanzado", "Un tipo de encriptación", "Un programa de recuperación de datos"], correct: 0 },
   { question: "¿Cuál es una buena práctica de seguridad?", options: ["Usar contraseñas largas y únicas", "Desactivar el firewall", "Compartir contraseñas", "Evitar actualizaciones"], correct: 0 },
   { question: "¿Qué es un ataque de spoofing?", options: ["Una técnica de falsificación de identidad", "Un método de cifrado", "Un software para eliminar virus", "Un tipo de firewall"], correct: 0 },
   { question: "¿Qué es el hacking ético?", options: ["Un ataque malicioso", "Un proceso de auditoría de seguridad legal", "Un tipo de malware", "Un protocolo de red"], correct: 1 },
   { question: "¿Qué es un ataque de día cero?", options: ["Un ataque contra una vulnerabilidad recién descubierta", "Un ataque que ocurre al inicio del año", "Una actualización de seguridad", "Un firewall automático"], correct: 0 },
   { question: "¿Qué es la autenticación biométrica?", options: ["Una técnica de cifrado de datos", "Un sistema que usa rasgos físicos para verificar identidad", "Un tipo de malware", "Un antivirus avanzado"], correct: 1 },
   { question: "¿Qué es el cifrado de extremo a extremo?", options: ["Un  proceso de cifrado donde solo emisor y receptor pueden leer el mensaje", "Un método para crear contraseñas seguras", "Una forma de backup", "Un proceso para eliminar malware"], correct: 0 }
];

