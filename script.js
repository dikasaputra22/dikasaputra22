const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll(".section");

// --- Popup ---
const aboutBtn = document.querySelector(".about-btn");
const popup = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");

if (aboutBtn) {
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
}

// --- SPA Router ---
function showSection(id) {
  sections.forEach(sec => {
    sec.classList.remove("active");
    if (sec.id === id) sec.classList.add("active");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.target === id) link.classList.add("active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.target;

    if (!document.getElementById(target)) {
      console.warn("Section not found:", target);
      return;
    }

    showSection(target);
    history.replaceState(null, "", "#" + target);
  });
});

// Always go to home on page load
window.addEventListener("load", () => {
  history.replaceState(null, "", " "); // hapus hash biar ga lompat section
  showSection("home"); // paksa tampil home setiap refresh
});

