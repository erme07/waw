const $navbar = document.querySelector(".main-header")
const $toggleMenu = document.getElementById("toggleMenu")

$toggleMenu.addEventListener("click", ()=>{
    $navbar.classList.toggle("show")
    $toggleMenu.classList.toggle("show")
})