import FazerData from "./modules/fazer-data";
import { fetchData } from "./modules/network";
import { getTodayIndex } from "./modules/tools";
import { fetchStations } from "./modules/pyora";

let curLang = "fi";

/**
 * Renders menu courses on page
 *
 * @param {string} data - lunchmenu text to add
 * @param {number} targetID - ID of list item
 */
const createMenu = (data, targetId) => {
  const ulElement = document.querySelector("#" + targetId);
  ulElement.innerHTML = "";
  for (const item of data) {
    const listElement = document.createElement("li");
    listElement.innerHTML = item;
    ulElement.appendChild(listElement);
  }
};

/**
 * Initialize application
 */
const init = () => {
  const temp = document.querySelector(".temp");
  const desc = document.querySelector(".desc");
  const feels = document.querySelector(".feelsLike");
  const ikoni = document.querySelector(".ikoni");

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=60.20999477922676&lon=24.976729499513702&units=metric&lang=FI&appid=b23387891ba41d0c4c9cccaf3ca4bf75"
  )
    .then((response) => response.json())
    .then((data) => {
      const tempValue = data["main"]["temp"];
      const feelsLike = data["main"]["feels_like"];
      const descValue = data["weather"][0]["description"];
      const iconcode = data["weather"][0]["icon"];
      const roundedTemp = Math.round(tempValue * 10) / 10;
      const roundedFeels = Math.round(feelsLike * 10) / 10;

      temp.innerHTML = `${roundedTemp}°C`;
      feels.innerHTML = `Tuntuu kuin:<b> ${roundedFeels}°C</b>`;
      desc.innerHTML = `<b> ${descValue}</b>`;
      ikoni.innerHTML = `<img src="./assets/icons/${iconcode}.svg" >`;
    });

  //Render Fazer - "allorigins" or "fazer-php"
  /**
   * @param {string} fazerData - url
   * @param {string} data - lunchmenu text
   */
  fetchData(FazerData.dataUrlFi, "fazer-php").then((data) => {
    const courses = FazerData.parseFazerMenuDay(
      data.LunchMenus,
      getTodayIndex()
    );
    createMenu(courses, "fazerMenu");
  });

  const list = document.querySelector("#info");
  const nappi = document.querySelector(".leftContainer");
  const avaa = document.querySelector("#avaa");
  const sulje = document.querySelector("#sulje");
  nappi.addEventListener("click", () => {
    if (window.innerWidth <= 1150) {
      if (list.style.display == "none" || list.style.display == "") {
        list.style.display = "block";
        avaa.style.display = "none";
        sulje.style.display = "block";
      } else {
        list.style.display = "none";
        avaa.style.display = "block";
        sulje.style.display = "none";
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1151) {
      avaa.style.display = "none";
      sulje.style.display = "none";
      list.style.display = "block";
    } else {
      avaa.style.display = "block";
    }
  });
};
init();
