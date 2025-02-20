// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// BACK TO TOP BUTTON FUNCTIONALITY
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.textContent = "↑";
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #f4511e;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
    display: none; /* Hidden by default */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal:not(.slide-right)"); // Ignore slide-right elements

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// SMOOTH SCROLLING FOR LINKS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

window.addEventListener("scroll", revealOnScroll);

// Initialize reveal animations on page load
revealOnScroll();
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-value");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText.replace(/,/g, ""); // Remove commas for calculation
      const increment = Math.max(1, Math.floor((target - current) / 30)); // Dynamic increment

      if (current < target) {
        counter.innerText = (current + increment).toLocaleString(); // Add commas for formatting
        requestAnimationFrame(updateCount); // Smooth animation using requestAnimationFrame
      } else {
        counter.innerText = target.toLocaleString(); // Ensure the final value matches the target
      }
    };

    updateCount();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".nav-btn.prev");
  const nextButton = document.querySelector(".nav-btn.next");
  const blogGrid = document.querySelector(".blog-grid");

  // Example functionality for the navigation buttons
  // You can implement your own sliding/pagination logic here
  prevButton.addEventListener("click", () => {
    // Handle previous page navigation
    console.log("Previous page clicked");
  });

  nextButton.addEventListener("click", () => {
    // Handle next page navigation
    console.log("Next page clicked");
  });

  // Optional: Add hover effect to blog cards
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });
});

// Blog Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".blog-carousel");
  const blogCards = document.querySelector(".blog-cards");
  const prevButton = document.getElementById("prevBlog");
  const nextButton = document.getElementById("nextBlog");
  let currentIndex = 0;
  const totalCards = document.querySelectorAll(".blog-card").length;

  function updateCarousel() {
    const translation = -currentIndex * 100;
    blogCards.style.transform = `translateX(${translation}%)`;

    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalCards - 1;
  }

  function updateButtonVisibility() {
    if (window.innerWidth <= 768) {
      prevButton.style.display = "block";
      nextButton.style.display = "block";
    } else {
      prevButton.style.display = "flex";  // Ensure visibility on desktop
      nextButton.style.display = "flex";
    }
  }

  function initCarousel() {
    if (window.innerWidth <= 768) {
      // Reset position when switching to mobile
      currentIndex = 0;
      updateCarousel();

      // Enable touch swiping
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0 && currentIndex < totalCards - 1) {
            // Swipe left
            currentIndex++;
          } else if (diff < 0 && currentIndex > 0) {
            // Swipe right
            currentIndex--;
          }
          updateCarousel();
        }
      }
    }
  }

  // Button click handlers
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initialize carousel
  initCarousel();
  updateButtonVisibility();

  // Update on resize
  window.addEventListener("resize", () => {
    initCarousel();
    updateButtonVisibility();
  });
});

