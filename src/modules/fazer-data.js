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
    const price = setMenu.Price;
    let meals = [];

    console.log(setMenu.Meals);

    for (const meal of setMenu.Meals) {
      meals.push = meal.Name + ": (" + meal.Diets + ") ";
    }
    for (let i = 0; i < Menus[dayOfWeek].SetMenus.length; i++) {
      //  console.log(Menus[dayOfWeek].SetMenus[i].Meals);
    }
    //return meal.Name + ": " + meal.Diets + ": " + price;
  });
  return dayMenu;
};

const FazerData = { parseFazerMenuDay, dataUrlFi, dataUrlEn };
export default FazerData;
