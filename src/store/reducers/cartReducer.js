const initState = {
  addedItems: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_ITEMS":
        return {...state};
    default:
        return {...state}
  };
}
