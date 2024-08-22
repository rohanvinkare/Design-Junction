// Loading Animation
document.addEventListener("DOMContentLoaded", () => {
    // Get loader and content elements
    const loaderWrapper = document.getElementById("loader-wrapper");
    const content = document.getElementById("content");

    // Simulate loading delay
    setTimeout(() => {
        // Hide loader
        loaderWrapper.style.display = "none";
        // Show content
        content.style.display = "block";
    }, 0); // Change 3600 to the desired delay time in milliseconds
});
// Spin loader
document.addEventListener("DOMContentLoaded", () => {
    // Get loader and content elements
    const spinLoaderWrapper = document.getElementById("spin-loader-wrapper");
    const content = document.getElementById("content");

    // Simulate loading delay
    setTimeout(() => {
        // Hide loader
        spinLoaderWrapper.style.display = "none";
        // Show content
        content.style.display = "block";
    }, 1500);
});

// JavaScript for FAQ Toggle
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('open');
        });
    });
});

// Typewriter Animation
const words = ['Personalised', 'Innovative', 'User-Friendly', 'Dynamic', 'Customizable'];
    const typewriter = document.getElementById('typewriter');

    function typeWords(words, index) {
        if (index < words.length) {
            typeWord(words[index], 0);
            setTimeout(() => eraseWord(words[index], 0), 1500);
            setTimeout(() => typeWords(words, (index + 1) % words.length), 3000); // Reset index to 0 when it reaches the end
        }
    }

    function typeWord(word, charIndex) {
        if (charIndex <= word.length) {
            typewriter.textContent = word.substring(0, charIndex);
            setTimeout(() => typeWord(word, charIndex + 1), 100);
        }
    }

    function eraseWord(word, charIndex) {
        if (charIndex <= word.length) {
            typewriter.textContent = word.substring(0, word.length - charIndex);
            setTimeout(() => eraseWord(word, charIndex + 1), 100);
        }
    }

    typeWords(words, 0);