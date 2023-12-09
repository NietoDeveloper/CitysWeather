function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const sr = ScrollReveal({
    origin: 'top',
    distance: '300px',
    duration: 3000,
    delay: 400,
})


sr.reveal(`.app-main`, {delay: 100}, {origin: 'left'}); 
sr.reveal(`.footer__logo`, {delay: 200}); 
sr.reveal(`.footer__content`, {interval: 300});
sr.reveal(`.footer__copy`), {interval: 400};
sr.reveal(`footer__dev-link`, {interval: 400});
sr.reveal(`date`, {interval:500}) 