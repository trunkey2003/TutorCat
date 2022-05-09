export const setUser = (user) => {
    return {
        type: "SET_USER",
        info: user
    };
};

export const deleteUser = () => {
    return {
        type: "DELETE_USER",
    };
};