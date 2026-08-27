document.addEventListener('DOMContentLoaded', () => {
  // 1. Detect your current environment dynamically
  const isGitHubSubfolder =
    window.location.hostname.includes('github.io') ||
    window.location.pathname.startsWith('/curracloerowingclub/');

  // 2. Set the base path prefix dynamically
  const basePath = isGitHubSubfolder ? '/curracloerowingclub/' : '/';

  // 3. Build your slides array using that dynamic base path
  const slides = [
    {
      img: `${basePath}assets/river-dawn-1.jpg`,
      caption: 'Dawn on the Slaney',
      alt: 'Dawn on the Slaney',
    },
    {
      img: `${basePath}assets/curracloe-1.jpg`,
      caption: 'Curracloe Beach',
      alt: 'Curracloe Beach',
    },
    {
      img: `${basePath}assets/darkness-into-light.jpg`,
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
