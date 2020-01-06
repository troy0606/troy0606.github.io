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
    $(".about_bio-hide").css({
      opacity: 0,
      top: "-100%"
    });
    drawDonutChart("#html5", $("#html5").data("percent"), 160, 160, ".20em");
    drawDonutChart("#css3", $("#css3").data("percent"), 160, 160, ".20em");
    drawDonutChart(
      "#javascript",
      $("#javascript").data("percent"),
      160,
      160,
      ".20em"
    );
    drawDonutChart("#jquery", $("#jquery").data("percent"), 160, 160, ".20em");
    drawDonutChart(
      "#react-js",
      $("#react-js").data("percent"),
      160,
      160,
      ".20em"
    );
    drawDonutChart("#mysql", $("#mysql").data("percent"), 160, 160, ".20em");
    drawDonutChart("#php", $("#php").data("percent"), 160, 160, ".20em");
    drawDonutChart("#nodejs", $("#nodejs").data("percent"), 160, 160, ".20em");
    $(".skill_main-wrapper .chart").css("padding", "20px 50px");
  } else {
    drawDonutChart("#html5", $("#html5").data("percent"), 80, 80, ".20em");
    drawDonutChart("#css3", $("#css3").data("percent"), 80, 80, ".20em");
    drawDonutChart(
      "#javascript",
      $("#javascript").data("percent"),
      80,
      80,
      ".20em"
    );
    drawDonutChart("#jquery", $("#jquery").data("percent"), 80, 80, ".20em");
    drawDonutChart(
      "#react-js",
      $("#react-js").data("percent"),
      80,
      80,
      ".20em"
    );
    drawDonutChart("#mysql", $("#mysql").data("percent"), 80, 80, ".20em");
    drawDonutChart("#php", $("#php").data("percent"), 80, 80, ".20em");
    drawDonutChart("#nodejs", $("#nodejs").data("percent"), 80, 80, ".20em");
    bio.find("p:first").css("display", "none");
    $(".about_bio-lightBox").css("display", "block");
    $(".skill_main-wrapper .chart").css("padding", "10px 5px");
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
  $(".about_bio-hide").css({
    opacity: 1,
    top: "0%"
  });
});

$(".about_bio-hide").click(() => {
  event.stopPropagation();
  $(".about_bio-hide").css({
    opacity: 0,
    top: "-100%"
  });
});

let duration = 2000,
  transition = 2000;

function drawDonutChart(element, percent, width, height, text_y) {
  if ($(element + " svg").length === 0 && width) {
    width = typeof width !== "undefined" ? width : 290;
    height = typeof height !== "undefined" ? height : 290;
    text_y = typeof text_y !== "undefined" ? text_y : "-.10em";

    let dataset = {
        lower: calcPercent(0),
        upper: calcPercent(percent)
      },
      radius = Math.min(width, height) / 2,
      pie = d3.layout.pie().sort(null),
      format = d3.format(".0%");

    let arc = d3.svg
      .arc()
      .innerRadius(radius - 20)
      .outerRadius(radius);

    let svg = d3
      .select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let path = svg
      .selectAll("path")
      .data(pie(dataset.lower))
      .enter()
      .append("path")
      .attr("class", function(d, i) {
        return "color" + i;
      })
      .attr("d", arc)
      .each(function(d) {
        this._current = d;
      }); // store the initial values

    let text = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", text_y);

    if (typeof percent === "string") {
      text.text(percent);
    } else {
      let progress = 0;
      let timeout = setTimeout(function() {
        clearTimeout(timeout);
        path = path.data(pie(dataset.upper)); // update the data
        path
          .transition()
          .duration(duration)
          .attrTween("d", function(a) {
            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
            let i = d3.interpolate(this._current, a);
            let i2 = d3.interpolate(progress, percent);
            this._current = i(0);
            return function(t) {
              text.text(format(i2(t) / 100));
              return arc(i(t));
            };
          }); // redraw the arcs
      }, 200);
    }
  }
}

function calcPercent(percent) {
  return [percent, 100 - percent];
}
