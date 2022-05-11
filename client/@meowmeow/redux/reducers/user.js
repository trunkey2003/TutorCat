export const User = (data = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return data = true; 
    case "SIGN_OUT":
      return data = false;
    default:
      return data = false;
  }
};
export default User