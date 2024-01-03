// Set the interval time for autoplay in milliseconds (e.g. 3000ms = 3 seconds)
const autoplayInterval = 7000;
let autoplayTimer;

// Get all slides and navigation buttons
const slides = document.querySelectorAll('.img-slider .slide');
const navigationButtons = document.querySelectorAll('.img-slider .navigation .btn1');

// Function to set the active slide and navigation button
const setActiveSlide = (index) => {
    // Loop through all slides and navigation buttons to remove the 'active' class
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        navigationButtons[i].classList.remove('active');
    }

    // Set the specified slide and navigation button as active
    slides[index].classList.add('active');
    navigationButtons[index].classList.add('active');

    // Reset autoplay timer
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, autoplayInterval);
};

// Function to move to the next slide
const nextSlide = () => {
    // Get the index of the current active slide
    const activeSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    // Calculate the index of the next slide
    const nextSlideIndex = (activeSlideIndex + 1) % slides.length;

    // Set the next slide as active
    setActiveSlide(nextSlideIndex);
};

// Autoplay the slider
autoplayTimer = setInterval(nextSlide, autoplayInterval);

// Add event listeners for manual navigation
navigationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        setActiveSlide(index);
    });
});
