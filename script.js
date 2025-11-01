// ===============================
// Smooth Scroll Navigation
// ===============================
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
// Tombol "Hubungi Saya" Scroll ke Kontak
// ===============================
const contactBtn = document.getElementById("btn-contact");
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });
}

// ===============================
// Efek Fade-In saat Scroll
// ===============================
const fadeElements = document.querySelectorAll(".about, .projects, .contact");

function fadeInOnScroll() {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    if (isVisible) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ===============================
// Typing Effect (Nama Otomatis)
// ===============================
const typedText = document.querySelector("h1 span");
const words = ["Syamsuardi", "Web Developer", "Mahasiswa Sistem Informasi"];
let wordIndex = 0;
let charIndex = 0;
let typing = true;

function typeAnimation() {
  const currentWord = words[wordIndex];

  if (typing) {
    typedText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length + 5) {
      typing = false;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeAnimation, typing ? 120 : 60);
}

window.addEventListener("load", typeAnimation);

// ===============================
// Animasi Klik Ikon Sosial Media
// ===============================
document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");
    setTimeout(() => icon.classList.remove("clicked"), 300);
  });
});

// ===============================
// ANIMASI BINTANG BERJATUHAN ✨
// ===============================
const canvas = document.getElementById("starfield");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  const numStars = 150;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Inisialisasi bintang
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random(),
    });
  }

  // Animasi bintang
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Gerakan jatuh + muncul ulang di atas
      star.y += star.speed;

      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawStars);
  }

  drawStars();
}

// ===============================
// Kirim Form Lewat Formspree (Masuk ke Email)
// ===============================
const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactFormElement);
    const submitBtn = contactFormElement.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Tampilkan loading
    submitBtn.innerHTML =
      '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactFormElement.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert(
          "✅ Pesan kamu sudah dikirim! Terima kasih telah menghubungi saya."
        );
        contactFormElement.reset();
      } else {
        alert("❌ Gagal mengirim pesan. Silakan coba lagi nanti.");
      }
    } catch (error) {
      alert(
        "⚠️ Terjadi kesalahan jaringan. Pastikan kamu terhubung ke internet."
      );
      console.error("Error:", error);
    } finally {
      // Kembalikan tombol ke kondisi semula
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ===============================
// Navbar Background saat Scroll
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(10, 14, 39, 0.98)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
  } else {
    header.style.background = "rgba(10, 14, 39, 0.95)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
  }
});

// ===============================
// Animasi Parallax untuk Hero
// ===============================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});
