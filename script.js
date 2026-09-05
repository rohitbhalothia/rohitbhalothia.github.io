const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

// Hero avatar: show the profile photo when it exists, initials otherwise
const avatarImg = document.querySelector(".avatar img");
if (avatarImg) {
  const hideIfMissing = () => avatarImg.remove();
  avatarImg.addEventListener("error", hideIfMissing);
  // Covers the case where the image already failed before this script ran
  window.addEventListener("load", () => {
    if (avatarImg.isConnected && avatarImg.naturalWidth === 0) hideIfMissing();
  });
}
