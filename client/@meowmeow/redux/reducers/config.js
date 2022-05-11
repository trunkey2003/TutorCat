const initalState = { langCode: 1, loggedIn: false }

export const Config = (data = initalState, action) => {
  switch (action.type) {
    case "SET_VI":
      return {
        ...data,
        langCode: 2,
      };
    case "SET_ENG":
      return {
        ...data,
        langCode: 1,
      };
    case "SIGN_IN":
      return {
        ...data,
        loggedIn: true,
      };
    case "SIGN_OUT":
      return {
        ...data,
        loggedIn: false,
      };
    default: 
      return data;
  }
};

export default Config