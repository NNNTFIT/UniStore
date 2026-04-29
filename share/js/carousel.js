function initCarouselButtons() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-container');
        const prev = carousel.querySelector('.carousel-prev');
        const next = carousel.querySelector('.carousel-next');
        if (!track || !prev || !next){
            return;
        } 

        const item = track.querySelector('.carousel-item');
        const gap = 16;
        const step = item ? item.offsetWidth + gap : Math.round(track.clientWidth * 0.75);

        prev.addEventListener('click', () => {
            track.scrollBy({ left: -step, behavior: 'smooth' });
        });

        next.addEventListener('click', () => {
            track.scrollBy({ left: step, behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', initCarouselButtons);
