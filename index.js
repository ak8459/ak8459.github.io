/* ═══════════════════════════════════════════════
   PORTFOLIO — JavaScript
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const sections = document.querySelectorAll(".section, .hero");

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Active nav link based on scroll position
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Back to top click
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ─── Mobile Navigation ───
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close mobile menu on outside click
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // ─── Typewriter Effect ───
  const typewriterElement = document.getElementById("typewriter");
  const phrases = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "React Developer",
    "Node.js Developer",
    "Problem Solver",
    "Software Developer",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeWrite() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Small pause before next phrase
    }

    setTimeout(typeWrite, typeSpeed);
  }

  typeWrite();

  // ─── Hero Particles ───
  const particlesContainer = document.getElementById("heroParticles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = 60 + Math.random() * 40 + "%";
    particle.style.width = 2 + Math.random() * 3 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDuration = 8 + Math.random() * 12 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }

  // ─── Scroll Reveal Animations ───
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Animate skill bars when visible
        if (entry.target.classList.contains("skill-card")) {
          const bar = entry.target.querySelector(".skill-progress");
          if (bar) {
            setTimeout(() => {
              bar.style.width = bar.dataset.width + "%";
            }, 300);
          }
        }
      }
    });
  }, observerOptions);

  // Observe animate items
  document
    .querySelectorAll(".animate-item, .reveal-up, .reveal-left, .reveal-right")
    .forEach((el) => {
      revealObserver.observe(el);
    });

  // Hero animations — trigger immediately
  setTimeout(() => {
    document.querySelectorAll(".hero .animate-item").forEach((el) => {
      el.classList.add("visible");
    });
  }, 200);

  // ─── Counter Animation ───
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach((counter) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * target);
              counter.textContent = current;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            }

            requestAnimationFrame(updateCounter);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // ─── Skills Tabs ───
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillContents = document.querySelectorAll(".skills-content");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      // Update tab buttons
      skillTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Show/hide content
      skillContents.forEach((content) => {
        if (content.id === targetTab) {
          content.style.display = "grid";
          // Re-animate cards
          content.querySelectorAll(".reveal-up").forEach((card) => {
            card.classList.remove("visible");
            setTimeout(() => card.classList.add("visible"), 50);
          });
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  // ─── Contact Form ───
  const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const originalHTML = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
        `;
    submitBtn.disabled = true;

    // Simulate sending (replace with actual API)
    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      contactForm.reset();

      // Show toast
      showToast("Message sent successfully! I'll get back to you soon.");
    }, 1500);
  });

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // ─── Smooth Scroll for Nav Links ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ─── Add spin animation for loading ───
  const style = document.createElement("style");
  style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);
});
// open and download resume
document.getElementById("resumeBtn").addEventListener("click", function () {
  // Open PDF in new tab
  window.open(
    "https://drive.google.com/file/d/1qpLOJUMoT85L8RkwioLTJINyCYOF3Wxt/view",
    "_blank",
  );

  // Trigger download
  const link = document.createElement("a");
  link.href =
    "https://drive.google.com/uc?export=download&id=1qpLOJUMoT85L8RkwioLTJINyCYOF3Wxt";
  link.download = "Akash_Sharma_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
