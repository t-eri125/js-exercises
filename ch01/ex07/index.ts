export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(instance: Point) {
    this.x += instance.x;
    this.y += instance.y;
    return { x: this.x, y: this.y };
  }
}
