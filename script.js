// Smooth scroll links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = e => {
        if(link.getAttribute("href") !== "#") {
            e.preventDefault();
            document.getElementById(link.getAttribute("href").substring(1))
                .scrollIntoView({ behavior: "smooth" });
        }
    };
});

// Dark Mode Toggle
const themeBtn = document.getElementById("themeToggle");
themeBtn.onclick = () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    themeBtn.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
};

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-theme");
    themeBtn.textContent = "🌙";
}

// Print / Export PDF
document.getElementById("printBtn").onclick = () => window.print();

// Reveal animation
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// Animate progress bars when visible
const skillBars = document.querySelectorAll('.progress-value');

observer.observe(document.querySelector("#skills"));

observer.callback = (entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      skillBars.forEach(bar => {
        bar.style.width = bar.style.width;
      });
    }
  });
};

// Animation formulaire contact
const contactForm = document.querySelector(".contact-form");

const formObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            contactForm.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

formObserver.observe(contactForm);


// Footer year auto-update
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------- EMAIL JS CONFIG ---------------- 
emailjs.init("t07wOnZ82MBVe3ju6");

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector("button");
    const statusText = document.getElementById("messageStatus");
    const emailValue = emailInput.value.trim();

    // Vérification email avant envoi
    if (!emailRegex.test(emailValue)) {
        emailError.textContent = "❌ Adresse e-mail invalide. Corrige-la avant d'envoyer.";
        emailInput.classList.add("invalid");
        return;
    }

    btn.disabled = true;
    btn.textContent = "⏳ Envoi...";

    emailjs.send("service_rrf84zq", "template_tg9vhag", {
        from_name: this.from_name.value,
        reply_to: this.reply_to.value,
        message: this.message.value
    })
    .then(() => {
        statusText.style.color = "green";
        statusText.textContent = "📩 Message envoyé avec succès !";
        this.reset();
        emailInput.classList.remove("invalid");
        emailError.textContent = "";
    })
    .catch((err) => {
        statusText.style.color = "red";
        statusText.textContent = "❌ Une erreur est survenue. Réessayez.";
        console.error("Erreur EmailJS:", err);
    })
    .finally(() => {
        btn.disabled = false;
        btn.textContent = "Envoyer";
    });
});


// Sélection des champs
const emailInput = document.getElementById("emailField");
const nameInput = document.getElementById("nameField");
const messageInput = document.getElementById("messageField");

// Messages erreur
const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const messageError = document.getElementById("messageError");

// Regex email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation dynamique
emailInput.addEventListener("input", () => {
    validateEmail();
});

nameInput.addEventListener("input", () => {
    validateName();
});

messageInput.addEventListener("input", () => {
    validateMessage();
});

// Fonctions validation
function validateEmail(){
    if(!emailRegex.test(emailInput.value.trim())){
        emailError.textContent = "❌ Adresse email invalide.";
        emailInput.classList.add("invalid");
        return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
    return true;
}

function validateName(){
    if(nameInput.value.trim().length < 2){
        nameError.textContent = "❌ Veuillez entrer au moins 2 caractères.";
        nameInput.classList.add("invalid");
        return false;
    }
    nameError.textContent = "";
    nameInput.classList.remove("invalid");
    return true;
}

function validateMessage(){
    if(messageInput.value.trim().length < 10){
        messageError.textContent = "❌ Le message doit contenir au moins 10 caractères.";
        messageInput.classList.add("invalid");
        return false;
    }
    messageError.textContent = "";
    messageInput.classList.remove("invalid");
    return true;
}

// Submit final
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector("button");
    const statusText = document.getElementById("messageStatus");

    // Vérifier tout avant envoi
    if(!validateName() | !validateEmail() | !validateMessage()){
        statusText.style.color = "red";
        statusText.textContent = "⚠️ Veuillez corriger les erreurs avant d'envoyer.";
        return;
    }

    // Envoi
    btn.disabled = true;
    btn.textContent = "⏳ Envoi...";

    emailjs.send("service_rrf84zq", "template_tg9vhag", {
        from_name: nameInput.value,
        reply_to: emailInput.value,
        message: messageInput.value
    })
    .then(() => {
        statusText.style.color = "green";
        statusText.textContent = "📩 Message envoyé avec succès !";
        this.reset();
    })
    .catch(() => {
        statusText.style.color = "red";
        statusText.textContent = "❌ Une erreur est survenue. Réessayez.";
    })
    .finally(() => {
        btn.disabled = false;
        btn.textContent = "Envoyer";
    });
});


