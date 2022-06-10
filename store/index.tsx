import { createContext, useReducer, useEffect, FC, ReactNode, Dispatch } from "react";
import Reducer from "./reducer";

type Props = {
  children?: ReactNode
}

type StoreT = {
  canvasCtx?: CanvasRenderingContext2D,
  onScroll?: ((cb: (elem: HTMLDivElement) => void) => void)
}

type ActionT = {
  type: "setCtx",
  payload: CanvasRenderingContext2D | undefined
} | {
  type: "setOnScroll",
  payload: ((cb: (elem: HTMLDivElement) => void) => void) | undefined
};

type StoreContextT = [StoreT, Dispatch<ActionT>];

const initialState: StoreT = {
  canvasCtx: undefined,
  onScroll: undefined
};

const StoreContext = createContext<StoreContextT>([initialState, () => { }]);

const StoreProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
};

export {
  StoreContext,
  StoreProvider
}

export type {
  StoreT,
  ActionT
}