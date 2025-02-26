import * as actions from "./actionType";

export const SetUser = (payload) => {
  return {
    type: actions.SET_USER,
    user: payload,
  };
};
