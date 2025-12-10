const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return null;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export default userReducer;
