// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

// Function to close menu
const closeMenu = () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  body.style.overflow = "";
  // Reset hamburger animation
  const spans = hamburger.querySelectorAll("span");
  spans.forEach(span => {
    span.style.transform = "none";
    span.style.opacity = "1";
  });
};

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
  const isActive = !hamburger.classList.contains("active");
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  
  // Toggle body scroll
  body.style.overflow = isActive ? "hidden" : "";
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll("span");
  if (isActive) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Function to scroll to section
const scrollToSection = (targetId) => {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = targetSection.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Handle all navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    // Close mobile menu if open
    closeMenu();
    
    // Small delay for mobile menu to close
    setTimeout(() => {
      scrollToSection(targetId);
    }, 150);
  });
});

// Update active navigation state
function updateActiveNav() {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  let currentSection = null;
  
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      currentSection = section;
    }
  });

  if (currentSection) {
    const currentSectionId = currentSection.getAttribute('id');
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// Throttle function to limit scroll event calls
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize active nav on page load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  document.body.style.opacity = "1";
  
  // Reset profile image animation on page load
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    profileImage.style.animation = 'none';
    setTimeout(() => {
      profileImage.style.animation = 'profileEntrance 1.5s ease-out forwards';
    }, 10);
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Create observers with different delays
function createDelayedObserver(delay) {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * delay);
      }
    });
  }, observerOptions);
}

// Create observers for different elements
const sectionObserver = createDelayedObserver(0);
const timelineObserver = createDelayedObserver(300);
const achievementObserver = createDelayedObserver(200);
const visionObserver = createDelayedObserver(150);

// Observe elements
document.querySelectorAll('.section').forEach(section => sectionObserver.observe(section));

// Load timeline item background images and observe them
document.querySelectorAll('.timeline-item').forEach((item, index) => {
  // Set background image from data attribute
  const bgImage = item.getAttribute('data-bg');
  if (bgImage) {
    const content = item.querySelector('.timeline-content');
    if (content) {
      // Create a background image container
      const bgContainer = document.createElement('div');
      bgContainer.className = 'timeline-bg-image';
      bgContainer.style.backgroundImage = `url(${bgImage})`;
      
      // Special positioning for the second and third timeline items
      if (index === 1 || index === 2) {
        bgContainer.classList.add('position-top');
      }
      
      // Insert the background container as the first child
      if (content.firstChild) {
        content.insertBefore(bgContainer, content.firstChild);
      } else {
        content.appendChild(bgContainer);
      }
    }
  }
  timelineObserver.observe(item);
});

document.querySelectorAll('.achievement-card').forEach(card => achievementObserver.observe(card));
document.querySelectorAll('.vision-card').forEach(card => visionObserver.observe(card));

// Add throttled scroll event listener
const throttledUpdateNav = throttle(updateActiveNav, 100);
window.addEventListener('scroll', throttledUpdateNav);

// Add parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});



// Add hover effects for social buttons
document.querySelectorAll(".social-btn, .connect-email").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.05)"
  })

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})


