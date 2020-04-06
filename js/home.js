const menu = document.querySelector(".menu");
const menuItems = document.querySelector(".menuItems");

menu.addEventListener("mouseenter", function(){
    menuItems.classList.add('is-visible');
});

menu.addEventListener("mouseleave", function(){
    menuItems.classList.remove('is-visible');
});