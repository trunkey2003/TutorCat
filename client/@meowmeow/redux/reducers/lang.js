export const Lang = (langCode = 1, action) => {
  switch (action.type) {
    case "SET_VI":
      return langCode = 2;
    case "SET_ENG":
      return langCode = 1;
    default:
      return langCode = 1;
  }
};
export default Lang