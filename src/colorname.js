/**
 * Calls an color API endpoint and returns the color name
 * @param {string} hexcode - The hex code of the color
 * @returns {Promise<string>} - Color name given hex code
 * @throws {Error} - If there is an error during the API call
 */
const callAPI = async (hexcode) => {
  try {
    const response = await fetch(
      `https://api.color.pizza/v1/?values=${hexcode}`
    );
    const data = await response.json();
    if (data.paletteTitle) {
      return data.paletteTitle;
    }
    return "";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * Retrieves name of a color based on hex code.
 * @param {string} color - The hex code of the color.
 * @returns {Promise<string>} - Promise that resolves to the color name.
 * @throws {Error} - If something goes wrong with the API call.
 */
const getColorName = async (color) => {
  let hexcode = color;
  if (color.startsWith("#")) {
    hexcode = color.substring(1);
  }
  try {
    const colorInfo = await callAPI(hexcode);
    return colorInfo;
  } catch (error) {
    console.error("Error in getColorName:", error);
    throw error;
  }
};

export { getColorName };
