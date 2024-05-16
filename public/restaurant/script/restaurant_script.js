"use strict";

// selecting
const burgerIconMenu = document.querySelector(".header__burger-menu");
const navBarmenu = document.getElementById("menu");
const overlay = document.querySelector(".overlay");
const loginBox = document.querySelector(".login-box");
const boxSlider = document.querySelector(".foodlist-slider__slid-box--items");
const containerProfile = document.querySelector(".header__account-profile");

const loginBtn = document.querySelector(".header__login-btn");
const loginBoxBtn = document.querySelector(".login-box__btn");
const scrollBtns = document.querySelectorAll(".foodlist-slider__slid-box--btn");
const closeLoginBoxBtn = document.querySelector(".login-box__close-btn");

const inputEmail = document.querySelector(".login-box__name");
const inputPassword = document.querySelector(".login-box__pass");

const passwordEye = document.querySelector(".login-box__pass--eye");
const passwordEyeOff = document.querySelector(".login-box__pass--eye-off");

const account1 = {
  name: "Mahendra Singh Dhoni",
  pict: "images/peson 1.png",
  email: "dhoni7@gmail.com",
  pass: "JL112233",
};
const account2 = {
  name: "Virat Kohali",
  pict: "images/peson 2.jpg",
  email: "virat18@gmail.com",
  pass: "king18",
};

// definde defulte
let MenuIsOpen;
function init() {
  MenuIsOpen = false; // includ position of menu
  navBarmenu.style.left = "-22rem";
  overlay.classList.add("hidden");
  passwordEyeOff.style.display = "none";
  containerProfile.innerHTML = "";
}
init();

// =============================== function ================================
let currentAccount;
// definde openning and closing menu function
const openCloseMenu = function () {
  if (MenuIsOpen == false) {
    navBarmenu.style.left = "0rem";
    overlay.classList.remove("hidden");
    MenuIsOpen = true;
  } else {
    init();
  }
};

// definde showing and hiding Login box
const openCloseLoginBox = function () {
  if (loginBox.classList.contains("hidden")) {
    loginBox.classList.remove("hidden");
  } else {
    loginBox.classList.add("hidden");
  }
};

// definde showing and hiding password in Login Box
const showHidePass = function () {
  if (inputPassword.type === "password") {
    passwordEyeOff.style.display = "block";
    passwordEye.style.display = "none";
    inputPassword.type = "text";
  } else {
    passwordEyeOff.style.display = "none";
    passwordEye.style.display = "block";
    inputPassword.type = "password";
  }
};

// set Lgin info
const setLoginInfo = function (account) {
  containerProfile.innerHTML = `
    <div class="header__account-profile--pict">
      <img src="${account.pict}" alt="profile" />
    </div>
    <h3 class="header__account-profile--name">${account.name}</h3>
    <p class="header__account-profile-btn">&#10094;</p>`;

  loginBtn.style.display = "none";
};

// ================================================================================

// Click on Hamburger icon's menu(openning) & overlay menu(closing menu)
burgerIconMenu.addEventListener("click", openCloseMenu);
overlay.addEventListener("click", openCloseMenu);

// click on Login botton & close botton for login box
loginBtn.addEventListener("click", openCloseLoginBox);
closeLoginBoxBtn.addEventListener("click", openCloseLoginBox);

//click on Eyes in password input
passwordEye.addEventListener("click", showHidePass);
passwordEyeOff.addEventListener("click", showHidePass);

loginBoxBtn.addEventListener("click", function (e) {
  e.preventDefault();
  accounts.forEach((acc) => {
    if (acc.email === inputEmail.value && acc.pass === inputPassword.value) {
      console.log("hey");
      setLoginInfo(acc);
      openCloseLoginBox();
    }
  });
});
// =================================================================================

// clicking for scroll the box in foodlist Section

for (const btn of scrollBtns) {
  btn.addEventListener("click", function () {
    // making function of scrolling
    const sizeOfScroll = function (size) {
      if (btn.classList.contains("left-btn")) {
        boxSlider.style.transform = "translate(0px, 0px)";
      } else {
        boxSlider.style.transform = `translate(${size}px, 0px)`;
      }
    };

    if (window.innerWidth <= 480) {
      // in less then 360px of screen's size
      sizeOfScroll(-250);
    } else if (window.innerWidth <= 300) {
      sizeOfScroll();
    } else {
      // in over then 360px of screen's size
      sizeOfScroll(-435);
    }
  });
}

// Loding animation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("html").scrollIntoView({ behavior: "smooth" });
});

const itemsAnimation = document.querySelectorAll(".loding-animation");
const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.style.transform = "translateY(0)";
    entry.target.style.opacity = "1";
    observer.unobserve(entry.target);
  }
};

const observer = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0.25,
});

itemsAnimation.forEach((i) => {
  observer.observe(i);
});


