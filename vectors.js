class vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  scaled_x(scale) {
    return this.x * scale;
  }

  scaled_y(scale) {
    return this.y * scale;
  }

  pol_angle() {
    let angle = atan2(this.y, this.x)
    return (angle > 0) ? angle : TWO_PI + angle;
  }

  scaled(scale) {
    return new vec2(this.x * scale, this.y * scale);
  }

  flip_x() {
    return new vec2(-this.x, this.y)
  }

  flip_y() {
    return new vec2(this.x, -this.y)
  }

  add(vec) {
    return new vec2(this.x + vec.x, this.y + vec.y);
  }

  sub(vec) {
    return new vec2(this.x - vec.x, this.y - vec.y);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  len() {
    return sqrt(this.dot(this));
  }

  dist(vec) {
    return (this.sub(vec)).len();
  }

  round() {
    let new_x = round(this.x);
    let new_y = round(this.y);
    return new vec2(new_x, new_y);
  }

  draw_arrow(scale = 1., origin = null, head = 5) {
    if (origin == null) {
      origin = new vec2(0, 0)
    }
    let a = origin.scaled(scale)
    let b = origin.add(this).scaled(scale)
    line(a.x, -a.y, b.x, -b.y)
    if (head) {
      circle(b.x, -b.y, head)
    }
  }

  draw_polar(scale = 1., head = 5) {
    line(0, 0, this.len() * scale, 0)
    noFill()
    arc(0, 0, this.len() * scale * 2, this.len() * scale * 2, TWO_PI - this.pol_angle(), 0)
    if (head) {

      circle(this.x * scale, -this.y * scale, head)
    }
  }

  label_head(scale, type = 'euk') {
    if (type == 'euk') {
      text('(' + nfc(this.x, 1) + ', ' + nfc(this.y, 1) + ')', this.scaled_x(scale) + 5, -this.scaled_y(scale) - 5)
    } else if (type = 'pol') {
      text('(' + nfc(this.len(), 1) + ', ' + nfc(this.pol_angle() / TWO_PI * 360, 0) + '\xB0)', this.scaled_x(scale) + 5, -this.scaled_y(scale) - 5)
    }
  }
}