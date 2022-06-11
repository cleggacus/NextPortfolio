import perlinNoise from "./perlinNoise";
import Node from "./node";

class Astar {
  private static readonly PERLIN_RES = 0.1;

  private complete: boolean;
  private found: boolean;

  private width: number;
  private height: number;
  private open: Node[];
  private closed: Node[];
  private path: Node[];
  private map: boolean[][];

  private nodeGrid: Node[][];

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.map = [];
    this.closed = [];
    this.path = [];
    this.nodeGrid = [];
    this.complete = false;
    this.found = false;
    
    this.createMap();
    this.createNodeGrid();

    this.open = [this.nodeGrid[0][0]];
  }

  public restart(map?: boolean[][]) {
    this.map = map || [];
    this.closed = [];
    this.path = [];
    this.nodeGrid = [];
    this.complete = false;
    this.found = false;
    
    if(!map)
      this.createMap();

    this.createNodeGrid();

    this.open = [this.nodeGrid[0][0]];
  }

  public getGridSize() {
    return [
      this.width, 
      this.height
    ];
  }

  public isComplete() {
    return this.complete;
  }

  public getPath() {
    return this.path.map(node => node.getPosition());
  }

  public getClosed() {
    return this.closed.map(node => node.getPosition());
  }

  public getOpen() {
    return this.open.map(node => node.getPosition());
  }

  public getMap() {
    return this.map;
  }

  public findValid() {
    while(!this.complete)
      this.next();

    const found = this.found;
    const map = this.map;

    this.restart(found ? map : undefined)

    return found;
  }

  public next() {
    let [width, height] = this.getGridSize();
    let best: Node | undefined = undefined;

    if(this.open.length > 0) {
      best = this.getBestOpen();
      let [bestX, bestY] = best.getPosition();

      if(bestX == width-1 && bestY == height-1) {
        this.complete = true;
        this.found = true;
        return;
      }

      this.removeFromOpen(best);
      this.closed.push(best);
      this.checkNeighbours(best);
    }

    if(best)
      this.path = this.findPath(best);
    else
      this.complete = true;
  }

  private findPath(node?: Node) {
    let path: Node[] = [];

    while(node != undefined) {
      path.push(node);
      node = node.getCameFrom();
    }

    return path;
  }

  private checkNeighbours(node: Node) {
    const neighbours = node.getNeighbours();
    const [nodeX, nodeY] = node.getPosition();

    for(let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let [neighbourX, neighbourY] = neighbour.getPosition();

      if(
        this.closed.filter(node => node == neighbour).length == 0 &&
        !this.map[neighbourY][neighbourX]
      ) {
        let g = node.getG() + 1;

        if(neighbourX != nodeX && neighbourY != nodeY)
          g = node.getG() + Math.SQRT2;

        if(this.open.filter(node => node == neighbour).length > 0) {
          if(g < neighbour.getG()) {
            neighbour.setG(g);
            neighbour.setCameFrom(node);
          }
        } else {
          neighbour.setG(g);
          neighbour.setCameFrom(node);
          this.open.push(neighbour);
        }

        neighbour.setH(this.distance(neighbour));
        neighbour.calcF();
      }
    }
  }

  private distance(node: Node) {
    const [width, height] = this.getGridSize();
    const [x, y] = node.getPosition();

    const dx = Math.abs(x - (width-1));
    const dy = Math.abs(y - (height-1));

    const D = 1;
    const D2 = Math.SQRT2;

    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
  }

  private removeFromOpen(node: Node) {
    for(let i = 0; i < this.open.length; i++) {
      if(this.open[i] == node)
        this.open.splice(i, 1);
    }
  }

  private getBestOpen() {
    if(this.open.length == 0)
      throw "No open nodes.";

    let best = this.open[0];

    for(let i = 1; i < this.open.length; i++) {
      const current = this.open[i];

      if(current.getF() < best.getF())
        best = current;
    }

    return best
  }

  private createNodeGrid() {
    const [width, height] = this.getGridSize();
    this.nodeGrid = [];

    for(let y = 0; y < height; y++) {
      this.nodeGrid.push([]);

      for(let x = 0; x < width; x++) 
        this.nodeGrid[y].push(
          new Node(x, y)
        );
    }

    for(let y = 0; y < height; y++)
      for(let x = 0; x < width; x++)
        this.nodeGrid[y][x].findNeighbours(this.nodeGrid)
  }

  private createMap() {
    const [width, height] = this.getGridSize();

    this.map = perlinNoise(
      width, height, 
      width * Astar.PERLIN_RES, 
      height * Astar.PERLIN_RES
    );
  }
}

export default Astar;