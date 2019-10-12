let grid_scale = 20;
let origin_x;
let origin_y;
let end_x;
let end_y;
let n_r;
let n_theta;
let mouse_pos;
let v_euk;
let drag = false;

var scale_slider;
var label_checkbox;

function setup() {
  createCanvas(1280, 720);
  origin_x = -width / 2;
  origin_y = -height / 2;
  end_x = width / 2;
  end_y = height / 2;
  n_r = floor(width * 1.2 / grid_scale / 2);
  n_theta = 12;

  scale_slider = createSlider(grid_scale, 200, 80);
  label_checkbox = createCheckbox('show labels', true);

  v_euk = new vec2(4, 3)

}

function draw() {
  background(200);
  translate(width / 2, height / 2);
  grid_scale = scale_slider.value();
  mouse_pos = new vec2(mouseX + origin_x, -mouseY - origin_y).scaled(1 / grid_scale);

  if (drag) {
    v_euk = mouse_pos
  }

  // setup grid
  strokeWeight(1);
  stroke(255);
  noFill();
  for (r_i = 0; r_i <= n_r; ++r_i) {
    circle(0, 0, r_i * grid_scale * 2);
  }
  for (theta_i = 0; theta_i < n_theta; ++theta_i) {
    let t = theta_i / n_theta * TWO_PI
    let x = cos(t) * end_x * 1.2
    let y = sin(t) * end_x * 1.2
    line(0, 0, x, y)
  }

  // add labels
  textSize(10)
  strokeWeight(0)
  fill(0)
  if (label_checkbox.checked()) {
    for (r_i = 0; r_i <= n_r; ++r_i) {
      text(r_i, r_i * grid_scale + 5, -5)
    }
    for (theta_i = 1; theta_i < n_theta + 1; ++theta_i) {
      let t = theta_i / n_theta * TWO_PI
      let x = cos(t + PI / 40) * .9
      let y = sin(t + PI / 40) * .9
      text(nfc(360 - t / TWO_PI * 360, 0) + '\xB0', x * grid_scale - 7, y * grid_scale + 3)
    }
  }
  // darw vector
  strokeWeight(2);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  v_euk.draw_polar(grid_scale);
  textSize(10);
  strokeWeight(0);
  fill(0);
  v_euk.label_head(grid_scale, 'pol');
}

function mousePressed() {
  if (mouse_pos.dist(v_euk) * grid_scale < 5) {
    drag = true;
  }
}

function mouseReleased() {
  drag = false;
}