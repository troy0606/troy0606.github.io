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
  $(this)
    .addClass("active")
    .siblings()
    .removeClass("active");
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
// $(".chart").easyPieChart({
//   lineWidth: 10,
//   lineCap: "butt",
//   barColor: "#f0cf85",
//   trackColor: "#ecf0f1",
//   size: 160,
//   animate: 1000
// });

let $window = $(window);

function checkWidth() {
  let windowSize = $window.width();
  let bio = $(".about_bio");
  let paragraphContent = $("<p></p>").html(`
  &emsp;&emsp;樂於學習新知，喜歡挑戰自己設定的目標或計畫...
  <br />
  從小參與不同的社團或學習各項運動，培養對於各領域知識求知慾...
  <br />
  &emsp;&emsp;剛開始上課時，每天都會在課堂中學習到許多知識...
  小型專題製作過程中，學習如何實作,JQuery/PHP/AJAX/資料庫...
  <br />
  &emsp;&emsp;最後的專題製作開始將基礎概念融會貫通，學習...
  <br />
  &emsp;&emsp;在資策會訓練的過程中，了解將概念實作的困難...
`);
  let paragraphLightBox = $("<a></a>")
    .text(`了解更多`)
    .addClass("about_bio-lightBox");
  if (windowSize > 800) {
    $(".about_bio-lightBox").css("display", "none");
    bio.find("p:last").css("display", "none");
    bio.find("p:first").css("display", "flex");
  } else {
    bio.find("p:first").css("display", "none");
    $(".about_bio-lightBox").css("display", "block");
    if ($(".about_bio p").length === 1) {
      bio.append(paragraphContent, paragraphLightBox);
    } else {
      bio.find("p:last").css("display", "flex");
    }
  }
}
// Execute on load
checkWidth();
// Bind event listener
$(window).resize(checkWidth);

$(".about_bio").on("click", ".about_bio-lightBox", () => {
  console.log("典籍");
});
