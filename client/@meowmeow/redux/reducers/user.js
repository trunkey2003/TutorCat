export const User = (data = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return data = action.info; 
    case "DELETE_USER":
      return data = null;
    default:
      return data = null;
  }
};
export default User