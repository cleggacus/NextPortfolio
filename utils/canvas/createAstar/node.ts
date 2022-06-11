class Node {
  private x: number;
  private y: number;

  private g: number; // distance
  private h: number; // heuristic
  private f: number; // final value

  private neighbours: Node[];
  private cameFrom?: Node;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.g = 0;
    this.h = 0;
    this.f = 0;

    this.neighbours = [];
    this.cameFrom = undefined;
  }

  public getPosition(): [number, number] {
    return [this.x, this.y]
  }

  public getH() {
    return this.h;
  }

  public getG() {
    return this.g;
  }

  public getF() {
    return this.f;
  }

  public getNeighbours() {
    return this.neighbours;
  }

  public findNeighbours(grid: Node[][]) {
    this.neighbours = [];

    const height = grid.length;
    const width = grid[0].length;

    const y = this.y;
    const x = this.x;

    if(y > 0)
      this.neighbours.push(grid[y-1][x]); // top
    if(x < width-1)
      this.neighbours.push(grid[y][x+1]); // right
    if(y < height-1)
      this.neighbours.push(grid[y+1][x]); // bottom
    if(x > 0)
      this.neighbours.push(grid[y][x-1]); // left

    if(y > 0 && x > 0)
      this.neighbours.push(grid[y-1][x-1]); // top left
    if(y > 0 && x < width-1)
      this.neighbours.push(grid[y-1][x+1]); // top right
    if(y < height-1 && x < width-1)
      this.neighbours.push(grid[y+1][x+1]); // bottom right
    if(y < height-1 && x > 0)
      this.neighbours.push(grid[y+1][x-1]); // bottom left
  }

  public getCameFrom() {
    return this.cameFrom;
  }

  public setCameFrom(node?: Node) {
    this.cameFrom = node;
  }

  public setG(g: number) {
    this.g = g;
  }

  public setH(h: number) {
    this.h = h;
  }

  public calcF() {
    this.f = this.g + this.h;
  }
}

export default Node;