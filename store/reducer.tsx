import { StoreT, ActionT } from ".";

const Reducer = (state: StoreT, action: ActionT): StoreT => {
  switch (action.type) {
    case "setCtx":
      return {
        ...state,
        canvasCtx: action.payload,
      }
    case "setOnScroll":
      return {
        ...state,
        onScroll: action.payload
      }
  }
};

export default Reducer;