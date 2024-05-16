let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});


// dark mode 

function myFunction() {
    var element = document.body;
    element.dataset.bsTheme =
      element.dataset.bsTheme == "light" ? "dark" : "light";
  }





 // content editable
/*
 const editor = document.getElementById('editor');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const underlineButton = document.getElementById('underlineButton');
const fontSizeSelect = document.getElementById('fontSize');
const colorPicker = document.getElementById('colorPicker');

// Function to apply styles to the selected text
function applyStyle(style, value) {
    document.execCommand(style, false, value);
}

// Bold button event
boldButton.addEventListener('click', function() {
    applyStyle('bold');
});

// Italic button event
italicButton.addEventListener('click', function() {
    applyStyle('italic');
});

// Underline button event
underlineButton.addEventListener('click', function() {
    applyStyle('underline');
});

// Font size select event
fontSizeSelect.addEventListener('change', function() {
    applyStyle('fontSize', fontSizeSelect.value + 'px');
});

// Color picker event
colorPicker.addEventListener('input', function() {
    applyStyle('foreColor', colorPicker.value);
});

*/
function toggleDeveloperMode() {
    var customizationOptions = document.getElementById("customizationOptions");
    var editableContent = document.getElementById("editableContent");
    var toggleButton = document.getElementById("toggleButton");

    if (customizationOptions.style.display === "none") {
        customizationOptions.style.display = "block";
        editableContent.contentEditable = "true";
        toggleButton.textContent = "Developer Mode ON";
    } else {
        customizationOptions.style.display = "none";
        editableContent.contentEditable = "false";
        toggleButton.textContent = "Developer Mode OFF";
    }
}

function changeColorDev() {
    var color = document.getElementById("colorPickerDev").value;
    document.getElementById("editableContent").style.color = color;
}

function changeFontSizeDev() {
    var fontSize = document.getElementById("fontSizeDev").value;
    document.getElementById("editableContent").style.fontSize = fontSize + "px";
}

function setAlignment(align) {
    document.getElementById("editableContent").style.textAlign = align;
}
