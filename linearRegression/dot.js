class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 8;
      this.fillColor = 255;
    }

    show = function (){
        ellipse(this.x, this.y, this.r, this.r)
        fill(this.fillColor);
    }
}