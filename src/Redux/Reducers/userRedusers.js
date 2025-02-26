import { SET_USER } from "../action/actionType";

const initialState = {
  user: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.Type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
