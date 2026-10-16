(function () {
    const images = Array.from(document.querySelectorAll('.image-zoom'));
    const viewer = document.getElementById('image-viewer');
    const preview = document.getElementById('image-viewer-image');
    const caption = document.getElementById('image-viewer-caption');
    const previous = viewer.querySelector('.image-viewer-previous');
    const next = viewer.querySelector('.image-viewer-next');
    let gallery = [];
    let currentIndex = 0;
    let opener = null;

    function showImage(index) {
        currentIndex = (index + gallery.length) % gallery.length;
        const image = gallery[currentIndex];
        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt;
        caption.textContent = `${image.alt || 'Image'} (${currentIndex + 1} of ${gallery.length})`;
        previous.hidden = next.hidden = gallery.length < 2;
    }

    images.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-haspopup', 'dialog');
        image.setAttribute('aria-controls', viewer.id);
        image.setAttribute('aria-label', `Open image: ${image.alt || 'Vehicle image'}`);

        function openImage() {
            opener = image;
            const section = image.closest('.tab-pane') || document;
            gallery = Array.from(section.querySelectorAll('.image-zoom'));
            showImage(gallery.indexOf(image));
            viewer.showModal();
            document.body.classList.add('image-viewer-open');
        }

        image.addEventListener('click', openImage);
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImage();
            }
        });
    });

    viewer.querySelector('.image-viewer-close').addEventListener('click', () => viewer.close());
    previous.addEventListener('click', () => showImage(currentIndex - 1));
    next.addEventListener('click', () => showImage(currentIndex + 1));
    viewer.addEventListener('click', (event) => {
        if (event.target === viewer || event.target.classList.contains('image-viewer-content')) {
            viewer.close();
        }
    });
    viewer.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showImage(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });
    viewer.addEventListener('close', () => {
        document.body.classList.remove('image-viewer-open');
        preview.removeAttribute('src');
        if (opener) opener.focus();
    });
})();
