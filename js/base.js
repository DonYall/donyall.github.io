"use strict";

const icon = document.querySelector(".menu");
const line1 = document.querySelector(".line-1");
const line2 = document.querySelector(".line-2");
const line3 = document.querySelector(".line-3");

const menu = document.querySelector(".nav-right");

icon.addEventListener("click", function () {
    line1.classList.toggle("active");
    line2.classList.toggle("active");
    line3.classList.toggle("active");
    menu.classList.toggle("active");
});


let darkMode = localStorage.getItem("darkMode");

const btnSwitch = document.querySelector(".switch");
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");

const enableDarkMode = () => {
    light.classList.toggle("hidden");
    dark.classList.toggle("hidden");
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
    light.classList.toggle("hidden");
    dark.classList.toggle("hidden");
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
    enableDarkMode();
}

btnSwitch.addEventListener("click", function (e) {
    console.log("click");
    e.preventDefault();
    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".aboutMeButton").forEach((button) => {
        button.addEventListener("click", function () {
            window.scrollTo(0, 0);
        });
    });

    document.querySelectorAll(".projectsButton").forEach((button) => {
        button.addEventListener("click", function () {
            window.scrollTo(0, document.getElementById("projectsSection").offsetTop);
        });
    });

    document.querySelectorAll(".contactButton").forEach((button) => {
        button.addEventListener("click", function () {
            window.scrollTo(0, document.getElementById("contactSection").offsetTop);
        });
    });
});

document.getElementById("discordButton").addEventListener("click", function () {
    const discordUsername = "donyall.";
    navigator.clipboard.writeText(discordUsername);
    alert(`Copied to clipboard!`);
});
