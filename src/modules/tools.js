/**
 * Todays date only in ISO format
 */
const todayISODate = new Date().toISOString().split("T")[0];

/**
 * Gets todays date
 *
 * @returns {number} - number of weekday
 */
const getTodayIndex = () => {
  const weekDayIndex = new Date().getDay() - 1;
  return weekDayIndex;
};
export { getTodayIndex, todayISODate };
