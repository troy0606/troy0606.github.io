const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn_burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItem = document.querySelectorAll(".menu-nav_item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    navItem.forEach(item => {
      item.classList.add("open");
    });
    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    navItem.forEach(item => {
      item.classList.remove("open");
    });
    showMenu = false;
  }
}

$(".menu-nav li").click(function() {
  const point = $(this)
    .find("a")
    .text()
    .toLowerCase();
  $("html,body").animate(
    {
      scrollTop: $("." + point).offset().top
    },
    700
  );
});
$(".chart").easyPieChart({
  lineWidth: 10,
  lineCap: "butt",
  barColor: "#f0cf85",
  trackColor: "#ecf0f1",
  size: 160,
  animate: 1000
});
