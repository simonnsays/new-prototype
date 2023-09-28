document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const moveLeftButton = document.getElementById('moveLeft');
    const moveRightButton = document.getElementById('moveRight');
    
    let currentSlide = 0;

    // Move to the specified slide
    function goToSlide(slideIndex) {
        carouselItems[currentSlide].classList.remove('active');
        carouselItems[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }

    // Event listener for the left arrow button
    moveLeftButton.addEventListener('click', function () {
        const prevSlide = (currentSlide === 0) ? carouselItems.length - 1 : currentSlide - 1;
        goToSlide(prevSlide);
    });

    // Event listener for the right arrow button
    moveRightButton.addEventListener('click', function () {
        const nextSlide = (currentSlide === carouselItems.length - 1) ? 0 : currentSlide + 1;
        goToSlide(nextSlide);
    });

    // Initialize the first slide
    goToSlide(0);
});
