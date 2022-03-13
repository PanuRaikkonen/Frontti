import { todayISODate } from "./tools";

const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=321259&weekDate=${todayISODate}`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=321259&weekDate=${todayISODate}`;

/**
 *Parses Fazer json data to simple array of strings
 *
 * @param {Array} Menus menu data
 * @param {Number} dayOfWeek 0-6
 * @returns {Array} daily menu
 */
const parseFazerMenuDay = (Menus, dayOfWeek) => {
  const dayMenu = Menus[dayOfWeek].SetMenus.map((setMenu) => {
    const name = setMenu.Name;
    let price = setMenu.Price;
    const diet = setMenu.Diets;
    let meals = "";

    for (const meal of setMenu.Meals) {
      meals += meal.Name + " (" + meal.Diets + ") <br>";
    }
    if (price === null) {
      price = "";
    }
    return name
      ? "<b>" + name + ": " + price + "</b>: <br>" + meals
      : meals + diet + ": ";
  });
  return dayMenu;
};

const FazerData = { parseFazerMenuDay, dataUrlFi, dataUrlEn };
export default FazerData;
