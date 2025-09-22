const menuMain = document.querySelector('.edusiteco-menu-main__container');
const btnMenu  = document.querySelector('.edusiteco-menu-main__btn-menu');
const searchForm = document.querySelector('.edusiteco-search-form');

btnMenu.addEventListener('click', ( ) => {
    // if(menuMain.classList.contains('show')) return;
    menuMain.classList.toggle('show');
    searchForm.classList.toggle('show');
});
