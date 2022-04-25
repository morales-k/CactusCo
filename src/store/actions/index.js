export const addItem = (updatedCart) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_ITEM",
      payload: updatedCart
    });
  }
};

export const removeItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item
    });
  }
};