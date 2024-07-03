// Listen for the DOMContentLoaded event which fires when the initial HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'image-carousel' which contain the images to be rotated
    const carousels = document.querySelectorAll('.image-carousel');

    // Iterate over each carousel found
    carousels.forEach(carousel => {
        // Find all images within the current carousel
        const images = carousel.querySelectorAll('.carousel-image');
        // Initialize a variable to keep track of the current image's index
        let currentImageIndex = 0;
        // Set the opacity of the first image to 1 to make it visible
        images[currentImageIndex].style.opacity = '1';

        // Set up a timer to run the enclosed function every 5000 milliseconds (5 seconds)
        setInterval(() => {
            // Set the opacity of the current image to 0 to make it invisible
            images[currentImageIndex].style.opacity = '0';
            // Update the index to point to the next image, wrapping around using modulo
            currentImageIndex = (currentImageIndex + 1) % images.length;
            // Set the opacity of the new current image to 1 to make it visible
            images[currentImageIndex].style.opacity = '1';
        }, 5000);
    });
});
