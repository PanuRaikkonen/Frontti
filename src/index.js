import FazerData from "./modules/fazer-data";
import { fetchData } from "./modules/network";
import { getTodayIndex } from "./modules/tools";
import { fetchStations } from "./modules/pyora";

let curLang = "fi";

/**
 * Renders menu courses on page
 *
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

  const temp = document.querySelector('.temp');
  const desc = document.querySelector('.desc');
  const feels = document.querySelector('.feelsLike');
  const ikoni = document.querySelector('.ikoni');

  fetch('https://api.openweathermap.org/data/2.5/weather?lat=60.20999477922676&lon=24.976729499513702&units=metric&lang=FI&appid=b23387891ba41d0c4c9cccaf3ca4bf75')
    .then(response => response.json())
    .then(data => {
      const tempValue = data['main']['temp'];
      const feelsLike = data['main']['feels_like'];
      const descValue = data['weather'][0]['description'];
      const iconcode = data['weather'][0]['icon'];
      const roundedTemp = Math.round(tempValue * 10) / 10;
      const roundedFeels = Math.round(feelsLike * 10) / 10;

      temp.innerHTML = `${roundedTemp}°C`;
      feels.innerHTML = `Tuntuu kuin:<b> ${roundedFeels}°C</b>`;
      desc.innerHTML = `<b> ${descValue}</b>`;
      ikoni.innerHTML = `<img src="./assets/icons/${iconcode}.svg" >`;

    });

  //Render Fazer - "allorigins" or "fazer-php"
  fetchData(FazerData.dataUrlFi, "fazer-php").then((data) => {
    console.log("fazer", data);
    //TODO: how to set correct weekday
    const courses = FazerData.parseFazerMenuDay(
      data.LunchMenus,
      getTodayIndex()
    );
    createMenu(courses, "fazerMenu");
  });

  //Event listeners
  /*document.querySelector("#language").addEventListener("click", () => {
    switchLang();
  });*/



};
init();
