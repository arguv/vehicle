(function(){

    const images = document.querySelectorAll('.image-zoom');

    images.forEach((image) => {
        image.addEventListener('click', function () {
            image.classList.toggle('zoomed');
        });
    });
  
})();