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
    $(".skill-category li").css("z-index", 0);
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    navItem.forEach(item => {
      item.classList.remove("open");
    });
    showMenu = false;
    $(".skill-category li").css("z-index", 2);
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
    $(".shadow").css("display", "none");
    bio.find("p:last").css("display", "none");
    bio.find("p:first").css("display", "flex");
    $(".about_bio-hide").css({
      opacity: 0,
      top: "-100%"
    });
    $(".skill_main-wrapper card").css("display", "flex");
    $(".skill_check").css("display", "none");
    $(".skill-category").css("display", "none");
    $(".skill-point").css("display", "none");
  } else {
    $(".skill_main-wrapper card").css("display", "none");
    $(".skill_check").css("display", "block");
    $(".skill-point").css("display", "block");
    bio.find("p:first").css("display", "none");
    $(".about_bio-lightBox").css("display", "block");
    $(".shadow").css("display", "block");
    $(".skill-category").css("display", "flex");
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
drawDonutChart("#react-js", $("#react-js").data("percent"), 160, 160, ".20em");
drawDonutChart("#mysql", $("#mysql").data("percent"), 160, 160, ".20em");
drawDonutChart("#php", $("#php").data("percent"), 160, 160, ".20em");
drawDonutChart("#nodejs", $("#nodejs").data("percent"), 160, 160, ".20em");
$(".skill_main-wrapper .chart").css("padding", "20px 50px");

function drawDonutChart(element, percent, width, height, text_y) {
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

function calcPercent(percent) {
  return [percent, 100 - percent];
}

let dataset = [
  { name: "HTML5", count: 60 },
  { name: "CSS3", count: 50 },
  { name: "JAVASCRIPT", count: 60 },
  { name: "JQuery", count: 50 },
  { name: "REACT JS", count: 50 },
  { name: "My SQL", count: 30 },
  { name: "NodeJS", count: 40 },
  { name: "PHP", count: 30 }
];

let pie = d3.layout
  .pie()
  .value(function(d) {
    return d.count;
  })
  .sort(null);

let w = 300,
  h = 300;

let outerRadiusArc = w / 2;
let innerRadiusArc = 100;
let shadowWidth = 10;

let outerRadiusArcShadow = innerRadiusArc + 1;
let innerRadiusArcShadow = innerRadiusArc - shadowWidth;

let color = d3.scale
  .ordinal()
  .range(["#41B787", "#6352B9", "#B65480", "#D5735A", "#D7D9DA"]);

let svg = d3
  .select("#chart-container")
  .append("svg")
  .attr({
    width: w,
    height: h,
    class: "shadow"
  })
  .append("g")
  .attr({
    transform: "translate(" + w / 2 + "," + h / 2 + ")"
  });

let createChart = function(
  svg,
  outerRadius,
  innerRadius,
  fillFunction,
  className
) {
  let arc = d3.svg
    .arc()
    .innerRadius(outerRadius)
    .outerRadius(innerRadius);

  let path = svg
    .selectAll("." + className)
    .data(pie(dataset))
    .enter()
    .append("path")
    .attr({
      class: className,
      d: arc,
      fill: fillFunction
    });

  path
    .transition()
    .duration(1000)
    .attrTween("d", function(d) {
      let interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function(t) {
        return arc(interpolate(t));
      };
    });
};

createChart(
  svg,
  outerRadiusArc,
  innerRadiusArc,
  function(d, i) {
    return color(d.data.name);
  },
  "path1"
);

createChart(
  svg,
  outerRadiusArcShadow,
  innerRadiusArcShadow,
  function(d, i) {
    let c = d3.hsl(color(d.data.name));
    return d3.hsl(c.h + 5, c.s - 0.07, c.l - 0.15);
  },
  "path2"
);

// let addText = function(text, y, size) {
//   svg
//     .append("text")
//     .text(text)
//     .attr({
//       "text-anchor": "middle",
//       y: y
//     })
//     .style({
//       fill: "#929DAF",
//       "font-size": size
//     });
// };

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

$(".skill_main-wrapper").on("click", ".shadow path", function() {
  if ($(this).attr("class") === "path1") {
    let index = $(".skill_main-wrapper .shadow path").index(this);
    let skillName = dataset[index].name;
    let skillPoint = dataset[index].count;
    $(".skill-point").text(skillPoint + " %");
    $(".skill_main-wrapper .skill_check").text(skillName);
    $(".skill_main-wrapper path")
      .not(this)
      .css({
        opacity: 0.5
      });
    $(this).css({
      opacity: 1
    });
  }
});

$(".skill-category li").click(function() {
  $(".skill-category li").css({
    "font-weight": "normal",
    color: "#fff"
  });
  $(this).css({
    "font-weight": "bold",
    color: "#ffd369"
  });
  $(".skill_main-wrapper .skill_check").text($(this).text());
  let index;
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i].name === $(this).text()) {
      index = i;
    } else {
      continue;
    }
  }
  $(".skill-point").text(`${dataset[index].count}` + " %");
  $(".skill_main-wrapper .shadow path").css("opacity", "0.5");
  $(".skill_main-wrapper .shadow path")
    .eq(index)
    .css("opacity", "1");
});
