type AstarRequestMessage = {
  req: "start",
  width: number,
  height: number
} | {
  req: "stop"
}

type DrawData = {
  width: number,
  height: number,
  path: [number, number][],
  open: [number, number][],
  closed: [number, number][],
  map: boolean[][]
}

type AstarResponseMessage = {
  res: "update",
  drawData: DrawData
}

export type {
  AstarRequestMessage,
  AstarResponseMessage,
  DrawData
}