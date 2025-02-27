
let hamMenu = document.querySelector('.ham-menu');
let hamItems = document.querySelector('.ham-items');

hamMenu.addEventListener('click', openMenu)

function openMenu(){
    hamMenu.classList.toggle('active')
    hamItems.classList.toggle('active')
}
