import { ACTION_TYPES } from "./actions";

export const reducer = (state, action) => {
  console.log("🚀 ~ file: reducer.js:4 ~ reducer ~ action:", action.payload);
  const actionTypes = {
    [ACTION_TYPES.SET_ID_TOKEN]: (prevState) => ({
      ...prevState,
      ...action.payload,
    }),
  };

  return actionTypes[action.type](state);
};
