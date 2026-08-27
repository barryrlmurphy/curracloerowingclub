document.addEventListener('DOMContentLoaded', () => {
  // Automatically detects your GitHub repository subdirectory name dynamically
  const base = window.location.pathname.substring(
    0,
    window.location.pathname.indexOf('/', 1) + 1
  );

  // 1. Define your array of slides (images, captions, and alt descriptions)
  const slides = [
    {
      img: `${base}assets/river-dawn-1.jpg`,
      caption: 'Dawn on the Slaney',
      alt: 'Dawn on the Slaney',
    },
    {
      img: `${base}assets/curracloe-1.jpg`, // Replace with your actual paths
      caption: 'Curracloe Beach',
      alt: 'Curracloe Beach',
    },
    {
      img: `${base}assets/darkness-into-light.jpg`,
      caption: 'Darkness into Light Event 2026',
      alt: 'Darkness into Light Event 2026',
    },
  ];

  const carousel = document.getElementById('heroCarousel');
  const caption = document.getElementById('heroCaption');
  const changeInterval = 5000; // Time in milliseconds (5 seconds)
  let currentIndex = 0;

  // 2. Preload images to prevent flickering transitions
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.img;
  });

  // 3. Function to update the DOM elements
  function updateSlide() {
    const currentSlide = slides[currentIndex];

    // Update background, caption text, and accessibility label
    carousel.style.backgroundImage = `url(${currentSlide.img})`;
    caption.textContent = currentSlide.caption;
    carousel.setAttribute('aria-label', currentSlide.alt);

    // Increment index or loop back to 0
    currentIndex = (currentIndex + 1) % slides.length;
  }

  // 4. Start the automatic carousel loop
  setInterval(updateSlide, changeInterval);
});
