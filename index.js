/**
 * Counts the number of extended GSM characters present in the given text.
 * Extended GSM characters include: ~, ^, |, \, [, ], {, }, and €.
 * 
 * @param {string} text - The text string to be analyzed for extended GSM characters.
 * @returns {number} The count of extended GSM characters in the text.
 */
const getExtGsmCharactersCount = (text) => {
    // Return 0 immediately if no text is provided
    if (!text) return 0;
  
    // Define a regular expression to match extended GSM characters
    // Characters included are: ~, ^, |, \, [, ], {, }, and €
    const regexp = new RegExp(
      "[\u007B\u007C\u007D\u007E\u005B\u005C\u005D\u005E\u20AC\\\\]",
      "g"
    );
  
    // Use the regular expression to find matches in the text
    const matches = text.match(regexp);
  
    // Return the number of matches found, or 0 if there are none
    return matches ? [...matches].length : 0;
  };
  

/**
 * Calculates the cost of sending messages and provides stats based on the message content and other parameters.
 * @param {string} text - The text of the message to be sent.
 * @param {boolean} unicodeEncoding - Indicates if the message uses Unicode encoding.
 * @param {object} senderNumber - Object containing the cost of sending SMS and MMS.
 * @param {number} subscribersCount - Number of subscribers to whom the message will be sent (defaults to 1).
 * @param {array} imagesAndVideos - Array containing images and videos to be sent with the message.
 * @param {boolean} withSegmentLogic - Flag to use segment logic for message splitting.
 * @returns {object} An object containing calculated credits, character count, SMS count, MMS count, and a warning for long messages.
 */
const getCreditsCostAndStats = (
  text,
  unicodeEncoding,
  senderNumber,
  subscribersCount = 1,
  imagesAndVideos = [],
  withSegmentLogic = false
) => {
  // Assign full text to a variable
  const fullText = text;

  // Calculate the count of extended GSM characters based on encoding
  const extGsmCharactersCount = unicodeEncoding
    ? 0
    : getExtGsmCharactersCount(fullText);

  // Calculate total characters including extended GSM characters
  const characters = fullText?.length + extGsmCharactersCount;

  // Set initial max characters per segment based on encoding
  let maxPerSegment = unicodeEncoding ? 70 : 160;

  // Adjust max characters per segment if character limit is exceeded and segment logic is not used
  if (characters > maxPerSegment && !withSegmentLogic) {
    maxPerSegment = unicodeEncoding ? 67 : 153;
  }

  // Calculate the number of SMS required
  const smsCount = Math.ceil(characters / maxPerSegment);

  // Calculate the number of MMS (1 if there are images/videos, else 0)
  const mmsCount = imagesAndVideos?.length > 0 ? 1 : 0;

  // Calculate the total cost of sending the message
  const calculatedCredits =
    senderNumber && subscribersCount
      ? subscribersCount *
        ((mmsCount ? 0 : smsCount) * senderNumber?.sms_cost +
          mmsCount * senderNumber?.mms_cost)
      : 0;

  // Generate a warning for messages exceeding the maximum character limit
  const tooLongWarning =
    characters > 1600 ? "Max characters count 1600 exceed." : null;

  // Return an object containing all calculated values and warnings
  return {
    calculatedCredits,
    characters,
    smsCount,
    mmsCount,
    tooLongWarning,
  };
};

module.exports = getCreditsCostAndStats;
module.exports = getExtGsmCharactersCount;
