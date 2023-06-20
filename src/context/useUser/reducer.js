import { ACTION_TYPES } from "./actions";

export const reducer = (state, action) => {
  const actionTypes = {
    [ACTION_TYPES.SET_ID_TOKEN]: (prevState) => ({
      ...prevState,
      ...action.payload,
    }),
  };

  return actionTypes[action.type](state);
};
