document.addEventListener('DOMContentLoaded', () => {
  // 1. Check your path builder. Make sure it explicitly uses leading slashes:
  const isGitHubSubfolder = window.location.pathname.startsWith(
    '/curracloerowingclub/'
  );

  // IMPORTANT: Note the leading / before curracloerowingclub
  const basePath = isGitHubSubfolder ? '/curracloerowingclub/' : '/';

  const slides = [
    {
      img: `${basePath}assets/darkness-into-light.jpg`,
      caption: 'Darkness into Light Event 2026',
      alt: 'Darkness into Light Event 2026',
    },
    {
      img: `${basePath}assets/event-3.JPG`,
      caption: 'Steph & Ryan',
      alt: 'Steph & Ryan',
    },
    {
      img: `${basePath}assets/event-2.JPG`,
      caption: 'Competition Time',
      alt: 'Competition Time',
    },
    {
      img: `${basePath}assets/gear-2.JPG`,
      caption: 'New Club Gear',
      alt: 'New Club Gear',
    },
    {
      img: `${basePath}assets/relay-for-life-1.JPG`,
      caption: 'Relay for Life Event',
      alt: 'Relay for Life Event',
    },
    {
      img: `${basePath}assets/juniors-2.JPG`,
      caption: 'Juniors',
      alt: 'Juniors',
    },
    {
      img: `${basePath}assets/curracloe-1.jpg`,
      caption: 'Curracloe Beach',
      alt: 'Curracloe Beach',
    },
    {
      img: `${basePath}assets/rowing-1.JPG`,
      caption: 'Killurin Bridge',
      alt: 'Killurin Bridge',
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
