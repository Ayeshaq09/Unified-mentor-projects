const Air_pollution = [];
const Outdoor_matter = [];
const Indoor_pollution = [];
const Outdoor_ozone = [];
const year = [];
const slider = document.getElementById("yearSlider");
const selYear = document.getElementById("selectedYear");
const ctx = document.getElementById("myChart").getContext("2d");
let chart = null;
let currentChart = "line";

// function to display line graph
function lineChart(xvalues, ds1, ds2, ds3, ds4) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xvalues,
      datasets: [
        {
          fill: false,
          label: "Air pollution (total)",
          lineTension: 0,
          backgroundColor: "rgba(153,109,57,1)",
          borderColor: "rgb(195, 180, 161)",
          data: ds1,
        },
        {
          fill: false,
          label: "Outdoor particulate matter",
          lineTension: 0,
          backgroundColor: "rgba(44,132,101,1)",
          borderColor: "rgb(174, 192, 186)",
          data: ds2,
        },
        {
          fill: false,
          label: "Indoor pollution",
          lineTension: 0,
          backgroundColor: "rgba(177,60,16,1)",
          borderColor: "rgb(193, 142, 123)",
          data: ds3,
        },
        {
          fill: false,
          label: "Outdoor ozone pollution",
          lineTension: 0,
          backgroundColor: "rgba(76,106,156,1)",
          borderColor: "rgb(150, 150, 186)",
          data: ds4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      width: "100%",
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "World air pollution line chart",
          color: "#095fa5",
          font: {
            size: 24,
            weight: "bold",
          },
        },
        tooltip: {
          backgroundColor: "#fff",
          borderColor: "#ccc",
          borderWidth: 1,
          titleColor: "#000",
          bodyColor: "#000",
          titleFont: { weight: "bold" },
          bodyFont: { weight: "bold" },
          padding: 12,
          displayColors: true,
          callbacks: {
            title: (tooltipItems) => {
              const yr = tooltipItems[0].label;
              return `${yr}\nin deaths per 100,000`;
            },
            label: (tooltipItem) => {
              return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Death rate (per 100,000)",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          ticks: {
            stepSize: 50,
            autoSkip: false,
          },
        },
        x: {
          title: {
            display: true,
            text: "Year",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          ticks: {
            callback: function (value, index) {
              const label = this.getLabelForValue(value);
              return index % 5 === 0 ? label : "";
            },
          },
        },
      },
    },
  });
}

// function to display bar graph
function barChart() {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Air pollution (total)",
        "Outdoor particulate matter",
        "Indoor air pollution",
        "Outdoor ozone pollution",
      ],
      datasets: [
        {
          fill: false,
          axis: "y",
          label: "Air pollution",
          lineTension: 0,
          backgroundColor: [
            "rgba(153,109,57,0.6)",
            "rgba(44,132,101,0.6)",
            "rgba(177,60,16,0.6)",
            "rgba(76,106,156,0.6)",
          ],
          borderColor: [
            "rgb(195, 180, 161)",
            "rgb(174, 192, 186)",
            "rgb(193, 142, 123)",
            "rgb(150, 150, 186)",
          ],
          data: [
            calculateAverage(Air_pollution),
            calculateAverage(Outdoor_matter),
            calculateAverage(Indoor_pollution),
            calculateAverage(Outdoor_ozone),
          ],
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      width: "100%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

let startYear = slider.value;
let startIndex = '';

// fetch json data and display in a graph
fetch("./data/pollutionData.json")
  .then((response) => response.json())
  .then((data) => {
    const world = data["World"];

    for (const i in world) {
      year.push(i);
      Air_pollution.push(world[i]["Air pollution (total)"]);
      Outdoor_matter.push(world[i]["Outdoor particulate matter"]);
      Indoor_pollution.push(world[i]["Indoor air pollution"]);
      Outdoor_ozone.push(world[i]["Outdoor ozone pollution"]);
    }

    lineChart(
      year,
      Air_pollution,
      Outdoor_matter,
      Indoor_pollution,
      Outdoor_ozone
    );


    // get the slider value using input event
    slider.addEventListener("input", () => {
      startYear = slider.value;
      selYear.textContent = startYear;
      startIndex = year.indexOf(startYear);
      currentIndex = startIndex;

      // set the values of air pollution and year as per slide value
      chart.data.labels = year.slice(startIndex);
      chart.data.datasets.forEach((ds, i) => {
        ds.data = [
          Air_pollution,
          Outdoor_matter,
          Indoor_pollution,
          Outdoor_ozone,
        ][i].slice(startIndex);
      });

      // if its 2025 and chart is line graph then change it to bar graph
      if (startYear === "2025" && currentChart !== "bar") {
        currentChart = "bar";
        barChart();
        selYear.textContent = '1990';
      } // if its not 2025 and chart is bar graph then change it to line graph
      else if (startYear !== "2025" && currentChart === "bar") {
        currentChart = "line";
        const slicedYear = year.slice(startIndex);
        const slicedAir_pollution = Air_pollution.slice(startIndex);
        const slicedOutdoor_matter = Outdoor_matter.slice(startIndex);
        const slicedIndoor_pollution = Indoor_pollution.slice(startIndex);
        const slicedOutdoor_ozone = Outdoor_ozone.slice(startIndex);

        lineChart(
          slicedYear,
          slicedAir_pollution,
          slicedOutdoor_matter,
          slicedIndoor_pollution,
          slicedOutdoor_ozone
        );
      }// if its a line graph then just update the chart values
      else {
        if (chart) chart.update();
      }
    });
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// calculate the average of air pollution for bar graph
function calculateAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum / arr.length;
}

const playBtn = document.getElementById("play");
let playInterval = null;
let currentIndex = 0;

// play btn functionality
function playYearsStep() {
  // Reset and stop when we reach 2024
  if (startYear ==='2024' || currentIndex >= year.length) {
    clearInterval(playInterval);
    playInterval = null;

    slider.value = '1990';
    startYear = '1990';
    selYear.textContent = '1990';

    // Reset chart to show from 1990
    currentIndex = year.indexOf(startYear);
    chart.data.labels = year.slice(currentIndex);
    chart.data.datasets.forEach((ds, i) => {
      ds.data = [
        Air_pollution,
        Outdoor_matter,
        Indoor_pollution,
        Outdoor_ozone,
      ][i].slice(currentIndex);
    });
    if (chart) chart.update();

    // Change play button back to play
    playBtn.classList.remove("bi-pause-fill");
    playBtn.classList.add("bi-play-fill");

    currentIndex = 0;
    return; // Stop animation
  }

  // Normal flow
  slider.value = year[currentIndex];
  startYear = slider.value;
  selYear.textContent = slider.value;

  const startIndex = year.indexOf(startYear);

  currentChart = "line";
  chart.data.labels = year.slice(startIndex);
  chart.data.datasets.forEach((ds, i) => {
    ds.data = [
      Air_pollution,
      Outdoor_matter,
      Indoor_pollution,
      Outdoor_ozone,
    ][i].slice(startIndex);
  });

  if (chart) chart.update();
  currentIndex++;
}

// change the play icon
playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("bi-play-fill"))  {
    playBtn.classList.remove("bi-play-fill");
    playBtn.classList.add("bi-pause-fill");
    playInterval = setInterval(playYearsStep, 300);
  }else if (playBtn.classList.contains("bi-pause-fill")) {
    playBtn.classList.remove("bi-pause-fill");
    playBtn.classList.add("bi-play-fill");

    clearInterval(playInterval);
  }
});

const panelContent = document.querySelector(".panel-content");
const panelTitle = document.querySelector(".panel-title");
const detailPanel = document.querySelector(".detail-panel");
const closePanel = document.querySelector(".close-btn");
const gridItems = document.querySelectorAll(".grid-item");
const typeSection = document.querySelectorAll(".types-section");


// fetch the details section data
fetch("./data/effectsData.json")
  .then((response) => response.json())
  .then((data) => {
    const effects = data["effects"];

    // addeventlistener click to all types of air pollution
    gridItems.forEach((item) => {
      item.addEventListener("click", function () {
        const type = this.getAttribute("pollution-type");
        showTypeDetails(type);
      });
    });

    // function to show details on click of the type of air pollution
    function showTypeDetails(type) {
      const data = effects[type];
      if (!data) return;

      panelTitle.textContent = data.title;

      let contentHTML = `
          ${
            data.features.description
              ? `<p class="description"><b>Description</b>: ${data.features.description}</p>`
              : ""
          }
          ${
            data.features.examples
              ? `<p class="examples"><b>Examples</b>: ${data.features.examples}</p>`
              : ""
          }
          ${
            data.features.sources
              ? `<p class="sources"><b>Sources</b>: ${data.features.sources}</p>`
              : ""
          }
          ${
            data.features.health_effects
              ? `<p class="health-effects"><b>Health-effects</b>: ${data.features.health_effects}</p>`
              : ""
          }
      `;

      panelContent.innerHTML = contentHTML;
      detailPanel.classList.add("active");
    }
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// close button click event
closePanel.addEventListener("click", () => {
  detailPanel.classList.remove("active");
});

// function to display health effects on body-points click
function displayEffects(bodyClass, arrowClass) {
  const bodyName = document.querySelector(`.${bodyClass}`);
  const arrowName = document.querySelector(`.${arrowClass}`);
  const bodyDisplay = window.getComputedStyle(bodyName).display;
  if (bodyDisplay === "none") {
    bodyName.style.display = "block";
    bodyName.style.transition = "0.4s display";
    arrowName.style.display = "block";
    arrowName.style.transition = "0.4s display";
  } else if (bodyName.style.display === "block") {
    bodyName.style.display = "none";
    bodyName.style.transition = "0.4s display";
    arrowName.style.display = "none";
    arrowName.style.transition = "0.4s display";
  }
}

// function to change alignment of arrows in health effects section
function updateLinePositions() {
  const width = window.innerWidth;

  if (width <= 320) {
    document.querySelector(".nose-arrow").setAttribute("x1", "25");
    document.querySelector(".nose-arrow").setAttribute("y1", "80");
    document.querySelector(".nose-arrow").setAttribute("x2", "100");
    document.querySelector(".nose-arrow").setAttribute("y2", "60");

    document.querySelector(".mouth-arrow").setAttribute("x1", "25");
    document.querySelector(".mouth-arrow").setAttribute("y1", "110");
    document.querySelector(".mouth-arrow").setAttribute("x2", "100");
    document.querySelector(".mouth-arrow").setAttribute("y2", "76");

    document.querySelector(".neck-arrow").setAttribute("x1", "25");
    document.querySelector(".neck-arrow").setAttribute("y1", "140");
    document.querySelector(".neck-arrow").setAttribute("x2", "120");
    document.querySelector(".neck-arrow").setAttribute("y2", "100");

    document.querySelector(".chest-arrow").setAttribute("x1", "25");
    document.querySelector(".chest-arrow").setAttribute("y1", "170");
    document.querySelector(".chest-arrow").setAttribute("x2", "90");
    document.querySelector(".chest-arrow").setAttribute("y2", "155");

    document.querySelector(".head-arrow").setAttribute("x1", "25");
    document.querySelector(".head-arrow").setAttribute("y1", "20");
    document.querySelector(".head-arrow").setAttribute("x2", "120");
    document.querySelector(".head-arrow").setAttribute("y2", "15");

    document.querySelector(".eye-arrow").setAttribute("x1", "25");
    document.querySelector(".eye-arrow").setAttribute("y1", "50");
    document.querySelector(".eye-arrow").setAttribute("x2", "110");
    document.querySelector(".eye-arrow").setAttribute("y2", "45");

    document.querySelector(".lung-arrow").setAttribute("x1", "145");
    document.querySelector(".lung-arrow").setAttribute("y1", "140");
    document.querySelector(".lung-arrow").setAttribute("x2", "100");
    document.querySelector(".lung-arrow").setAttribute("y2", "152");

    document.querySelector(".stomach-arrow").setAttribute("x1", "145");
    document.querySelector(".stomach-arrow").setAttribute("y1", "190");
    document.querySelector(".stomach-arrow").setAttribute("x2", "100");
    document.querySelector(".stomach-arrow").setAttribute("y2", "193");

    document.querySelector(".ear-arrow").setAttribute("x1", "145");
    document.querySelector(".ear-arrow").setAttribute("y1", "50");
    document.querySelector(".ear-arrow").setAttribute("x2", "90");
    document.querySelector(".ear-arrow").setAttribute("y2", "55");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "145");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "100");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "100");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "105");
  } else if (width <= 425) {
    document.querySelector(".nose-arrow").setAttribute("x1", "10");
    document.querySelector(".nose-arrow").setAttribute("y1", "80");
    document.querySelector(".nose-arrow").setAttribute("x2", "130");
    document.querySelector(".nose-arrow").setAttribute("y2", "60");

    document.querySelector(".mouth-arrow").setAttribute("x1", "10");
    document.querySelector(".mouth-arrow").setAttribute("y1", "110");
    document.querySelector(".mouth-arrow").setAttribute("x2", "130");
    document.querySelector(".mouth-arrow").setAttribute("y2", "76");

    document.querySelector(".neck-arrow").setAttribute("x1", "10");
    document.querySelector(".neck-arrow").setAttribute("y1", "140");
    document.querySelector(".neck-arrow").setAttribute("x2", "150");
    document.querySelector(".neck-arrow").setAttribute("y2", "100");

    document.querySelector(".chest-arrow").setAttribute("x1", "10");
    document.querySelector(".chest-arrow").setAttribute("y1", "170");
    document.querySelector(".chest-arrow").setAttribute("x2", "120");
    document.querySelector(".chest-arrow").setAttribute("y2", "155");

    document.querySelector(".head-arrow").setAttribute("x1", "10");
    document.querySelector(".head-arrow").setAttribute("y1", "20");
    document.querySelector(".head-arrow").setAttribute("x2", "150");
    document.querySelector(".head-arrow").setAttribute("y2", "15");

    document.querySelector(".eye-arrow").setAttribute("x1", "10");
    document.querySelector(".eye-arrow").setAttribute("y1", "50");
    document.querySelector(".eye-arrow").setAttribute("x2", "140");
    document.querySelector(".eye-arrow").setAttribute("y2", "45");

    document.querySelector(".lung-arrow").setAttribute("x1", "160");
    document.querySelector(".lung-arrow").setAttribute("y1", "140");
    document.querySelector(".lung-arrow").setAttribute("x2", "80");
    document.querySelector(".lung-arrow").setAttribute("y2", "152");

    document.querySelector(".stomach-arrow").setAttribute("x1", "160");
    document.querySelector(".stomach-arrow").setAttribute("y1", "190");
    document.querySelector(".stomach-arrow").setAttribute("x2", "80");
    document.querySelector(".stomach-arrow").setAttribute("y2", "193");

    document.querySelector(".ear-arrow").setAttribute("x1", "160");
    document.querySelector(".ear-arrow").setAttribute("y1", "50");
    document.querySelector(".ear-arrow").setAttribute("x2", "50");
    document.querySelector(".ear-arrow").setAttribute("y2", "55");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "160");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "100");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "70");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "105");
  } else if (width <= 500) {
    document.querySelector(".nose-arrow").setAttribute("x1", "10");
    document.querySelector(".nose-arrow").setAttribute("y1", "80");
    document.querySelector(".nose-arrow").setAttribute("x2", "140");
    document.querySelector(".nose-arrow").setAttribute("y2", "60");

    document.querySelector(".mouth-arrow").setAttribute("x1", "10");
    document.querySelector(".mouth-arrow").setAttribute("y1", "110");
    document.querySelector(".mouth-arrow").setAttribute("x2", "140");
    document.querySelector(".mouth-arrow").setAttribute("y2", "76");

    document.querySelector(".neck-arrow").setAttribute("x1", "10");
    document.querySelector(".neck-arrow").setAttribute("y1", "140");
    document.querySelector(".neck-arrow").setAttribute("x2", "150");
    document.querySelector(".neck-arrow").setAttribute("y2", "100");

    document.querySelector(".chest-arrow").setAttribute("x1", "10");
    document.querySelector(".chest-arrow").setAttribute("y1", "170");
    document.querySelector(".chest-arrow").setAttribute("x2", "120");
    document.querySelector(".chest-arrow").setAttribute("y2", "155");

    document.querySelector(".head-arrow").setAttribute("x1", "10");
    document.querySelector(".head-arrow").setAttribute("y1", "20");
    document.querySelector(".head-arrow").setAttribute("x2", "160");
    document.querySelector(".head-arrow").setAttribute("y2", "15");

    document.querySelector(".eye-arrow").setAttribute("x1", "10");
    document.querySelector(".eye-arrow").setAttribute("y1", "50");
    document.querySelector(".eye-arrow").setAttribute("x2", "140");
    document.querySelector(".eye-arrow").setAttribute("y2", "45");

    document.querySelector(".lung-arrow").setAttribute("x1", "160");
    document.querySelector(".lung-arrow").setAttribute("y1", "140");
    document.querySelector(".lung-arrow").setAttribute("x2", "75");
    document.querySelector(".lung-arrow").setAttribute("y2", "152");

    document.querySelector(".stomach-arrow").setAttribute("x1", "160");
    document.querySelector(".stomach-arrow").setAttribute("y1", "190");
    document.querySelector(".stomach-arrow").setAttribute("x2", "60");
    document.querySelector(".stomach-arrow").setAttribute("y2", "193");

    document.querySelector(".ear-arrow").setAttribute("x1", "160");
    document.querySelector(".ear-arrow").setAttribute("y1", "50");
    document.querySelector(".ear-arrow").setAttribute("x2", "50");
    document.querySelector(".ear-arrow").setAttribute("y2", "55");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "160");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "100");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "60");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "105");
  } else if (width <= 614) {
    document.querySelector(".nose-arrow").setAttribute("x1", "100");
    document.querySelector(".nose-arrow").setAttribute("y1", "80");
    document.querySelector(".nose-arrow").setAttribute("x2", "208");
    document.querySelector(".nose-arrow").setAttribute("y2", "86");

    document.querySelector(".mouth-arrow").setAttribute("x1", "100");
    document.querySelector(".mouth-arrow").setAttribute("y1", "110");
    document.querySelector(".mouth-arrow").setAttribute("x2", "205");
    document.querySelector(".mouth-arrow").setAttribute("y2", "105");

    document.querySelector(".neck-arrow").setAttribute("x1", "100");
    document.querySelector(".neck-arrow").setAttribute("y1", "140");
    document.querySelector(".neck-arrow").setAttribute("x2", "240");
    document.querySelector(".neck-arrow").setAttribute("y2", "145");

    document.querySelector(".chest-arrow").setAttribute("x1", "100");
    document.querySelector(".chest-arrow").setAttribute("y1", "220");
    document.querySelector(".chest-arrow").setAttribute("x2", "190");
    document.querySelector(".chest-arrow").setAttribute("y2", "225");

    document.querySelector(".head-arrow").setAttribute("x1", "100");
    document.querySelector(".head-arrow").setAttribute("y1", "20");
    document.querySelector(".head-arrow").setAttribute("x2", "250");
    document.querySelector(".head-arrow").setAttribute("y2", "25");

    document.querySelector(".eye-arrow").setAttribute("x1", "100");
    document.querySelector(".eye-arrow").setAttribute("y1", "50");
    document.querySelector(".eye-arrow").setAttribute("x2", "210");
    document.querySelector(".eye-arrow").setAttribute("y2", "65");

    document.querySelector(".lung-arrow").setAttribute("x1", "270");
    document.querySelector(".lung-arrow").setAttribute("y1", "200");
    document.querySelector(".lung-arrow").setAttribute("x2", "200");
    document.querySelector(".lung-arrow").setAttribute("y2", "205");

    document.querySelector(".stomach-arrow").setAttribute("x1", "270");
    document.querySelector(".stomach-arrow").setAttribute("y1", "290");
    document.querySelector(".stomach-arrow").setAttribute("x2", "180");
    document.querySelector(".stomach-arrow").setAttribute("y2", "295");

    document.querySelector(".ear-arrow").setAttribute("x1", "270");
    document.querySelector(".ear-arrow").setAttribute("y1", "70");
    document.querySelector(".ear-arrow").setAttribute("x2", "175");
    document.querySelector(".ear-arrow").setAttribute("y2", "76");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "270");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "150");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "185");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "155");
  } else if (width <= 768) {
    document.querySelector(".nose-arrow").setAttribute("x1", "170");
    document.querySelector(".nose-arrow").setAttribute("y1", "80");
    document.querySelector(".nose-arrow").setAttribute("x2", "245");
    document.querySelector(".nose-arrow").setAttribute("y2", "85");

    document.querySelector(".mouth-arrow").setAttribute("x1", "170");
    document.querySelector(".mouth-arrow").setAttribute("y1", "110");
    document.querySelector(".mouth-arrow").setAttribute("x2", "250");
    document.querySelector(".mouth-arrow").setAttribute("y2", "106");

    document.querySelector(".neck-arrow").setAttribute("x1", "170");
    document.querySelector(".neck-arrow").setAttribute("y1", "150");
    document.querySelector(".neck-arrow").setAttribute("x2", "280");
    document.querySelector(".neck-arrow").setAttribute("y2", "150");

    document.querySelector(".chest-arrow").setAttribute("x1", "170");
    document.querySelector(".chest-arrow").setAttribute("y1", "220");
    document.querySelector(".chest-arrow").setAttribute("x2", "220");
    document.querySelector(".chest-arrow").setAttribute("y2", "225");

    document.querySelector(".head-arrow").setAttribute("x1", "170");
    document.querySelector(".head-arrow").setAttribute("y1", "20");
    document.querySelector(".head-arrow").setAttribute("x2", "290");
    document.querySelector(".head-arrow").setAttribute("y2", "25");

    document.querySelector(".eye-arrow").setAttribute("x1", "170");
    document.querySelector(".eye-arrow").setAttribute("y1", "60");
    document.querySelector(".eye-arrow").setAttribute("x2", "250");
    document.querySelector(".eye-arrow").setAttribute("y2", "67");

    document.querySelector(".lung-arrow").setAttribute("x1", "200");
    document.querySelector(".lung-arrow").setAttribute("y1", "200");
    document.querySelector(".lung-arrow").setAttribute("x2", "160");
    document.querySelector(".lung-arrow").setAttribute("y2", "205");

    document.querySelector(".stomach-arrow").setAttribute("x1", "200");
    document.querySelector(".stomach-arrow").setAttribute("y1", "300");
    document.querySelector(".stomach-arrow").setAttribute("x2", "140");
    document.querySelector(".stomach-arrow").setAttribute("y2", "295");

    document.querySelector(".ear-arrow").setAttribute("x1", "200");
    document.querySelector(".ear-arrow").setAttribute("y1", "80");
    document.querySelector(".ear-arrow").setAttribute("x2", "130");
    document.querySelector(".ear-arrow").setAttribute("y2", "77");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "200");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "150");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "140");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "155");
  } else {
    document.querySelector(".nose-arrow").setAttribute("x1", "220");
    document.querySelector(".nose-arrow").setAttribute("y1", "110");
    document.querySelector(".nose-arrow").setAttribute("x2", "340");
    document.querySelector(".nose-arrow").setAttribute("y2", "113");

    document.querySelector(".mouth-arrow").setAttribute("x1", "220");
    document.querySelector(".mouth-arrow").setAttribute("y1", "140");
    document.querySelector(".mouth-arrow").setAttribute("x2", "346");
    document.querySelector(".mouth-arrow").setAttribute("y2", "146");

    document.querySelector(".neck-arrow").setAttribute("x1", "220");
    document.querySelector(".neck-arrow").setAttribute("y1", "200");
    document.querySelector(".neck-arrow").setAttribute("x2", "400");
    document.querySelector(".neck-arrow").setAttribute("y2", "196");

    document.querySelector(".chest-arrow").setAttribute("x1", "220");
    document.querySelector(".chest-arrow").setAttribute("y1", "300");
    document.querySelector(".chest-arrow").setAttribute("x2", "315");
    document.querySelector(".chest-arrow").setAttribute("y2", "302");

    document.querySelector(".head-arrow").setAttribute("x1", "220");
    document.querySelector(".head-arrow").setAttribute("y1", "40");
    document.querySelector(".head-arrow").setAttribute("x2", "405");
    document.querySelector(".head-arrow").setAttribute("y2", "37");

    document.querySelector(".eye-arrow").setAttribute("x1", "220");
    document.querySelector(".eye-arrow").setAttribute("y1", "70");
    document.querySelector(".eye-arrow").setAttribute("x2", "345");
    document.querySelector(".eye-arrow").setAttribute("y2", "80");

    document.querySelector(".lung-arrow").setAttribute("x1", "200");
    document.querySelector(".lung-arrow").setAttribute("y1", "305");
    document.querySelector(".lung-arrow").setAttribute("x2", "60");
    document.querySelector(".lung-arrow").setAttribute("y2", "305");

    document.querySelector(".stomach-arrow").setAttribute("x1", "200");
    document.querySelector(".stomach-arrow").setAttribute("y1", "380");
    document.querySelector(".stomach-arrow").setAttribute("x2", "30");
    document.querySelector(".stomach-arrow").setAttribute("y2", "385");

    document.querySelector(".ear-arrow").setAttribute("x1", "200");
    document.querySelector(".ear-arrow").setAttribute("y1", "93");
    document.querySelector(".ear-arrow").setAttribute("x2", "20");
    document.querySelector(".ear-arrow").setAttribute("y2", "93");

    document.querySelector(".shoulder-arrow").setAttribute("x1", "200");
    document.querySelector(".shoulder-arrow").setAttribute("y1", "200");
    document.querySelector(".shoulder-arrow").setAttribute("x2", "32");
    document.querySelector(".shoulder-arrow").setAttribute("y2", "205");
  }
}

window.addEventListener("resize", () => {
  updateLinePositions();
});

updateLinePositions();
