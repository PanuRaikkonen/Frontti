import { todayISODate } from "./tools";

const dataUrlDaily = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;
const dataUrlWeekly =
  "https://www.sodexo.fi/ruokalistat/output/weekly_json/152";

/**
 * Extract courses titles from Sodexo menu JSON course
 *
 * @param {string} menu - JSON menu to be parsed
 * @param {string} lang - ui language
 *
 * @returns {array} daily menu
 */
const parseDayMenu = (menu, lang = "fi") => {
  const courses = Object.values(menu);
  const dailyMenu = [];

  for (const course of courses) {
    if (lang === "en") {
      dailyMenu.push(course.title_en);
    } else {
      dailyMenu.push(course.title_fi);
    }
  }
  return dailyMenu;
};

const SodexoData = { dataUrlWeekly, dataUrlDaily, parseDayMenu };
export default SodexoData;
