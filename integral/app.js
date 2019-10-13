let grid_scale = 20;
let origin_x;
let origin_y;
let end_x;
let end_y;
let n_x;
let n_y;
let mouse_pos;
let x_lower = 0.;
let x_upper = 4.5;
let n_bars = 16;
let bar_size;

var scale_slider;
var bar_slider
var label_checkbox;

function setup() {
  createCanvas(1280, 720);
  origin_x = -width / 2;
  origin_y = -height / 2;
  end_x = width / 2;
  end_y = height / 2;
  n_x = floor(width / grid_scale);
  n_y = floor(height / grid_scale);

  scale_slider = createSlider(grid_scale, 200, 80);
  bar_slider = createSlider(0, 9, 3, 1)
  label_checkbox = createCheckbox('labels', true);
}

function draw() {
  background(200);
  translate(width / 2, height / 2);
  grid_scale = scale_slider.value();
  mouse_pos = new vec2(mouseX + origin_x, -mouseY - origin_y).scaled(1 / grid_scale);

  // setup grid
  strokeWeight(1)
  stroke(255)
  for (x_i = -floor(n_x / 2); x_i <= n_x; ++x_i) {
    line(x_i * grid_scale, origin_y, x_i * grid_scale, end_y)
  }
  for (y_i = -floor(n_y / 2); y_i <= n_y; ++y_i) {
    line(origin_x, y_i * grid_scale, end_x, y_i * grid_scale)
  }

  // setup axes
  strokeWeight(2);
  stroke(0);
  line(origin_x, 0, end_x, 0);
  line(0, origin_y, 0, end_y);

  // add labels
  textSize(20);
  strokeWeight(1);
  fill(0);
  stroke(0);
  text('x', end_x - 20, 20)
  text('f(x)', -35, origin_y + 25)
  textSize(10)
  if (label_checkbox.checked()) {
    strokeWeight(0);
    for (x_i = -floor(n_x / 2); x_i <= n_x; ++x_i) {
      text(x_i, x_i * grid_scale + 5, -5)
    }
    for (y_i = -floor(n_y / 2); y_i <= n_y; ++y_i) {
      text(-y_i, 5, y_i * grid_scale - 5)
    }
  }

  // add limits
  strokeWeight(1)
  stroke(0, 255, 0)
  line(x_lower * grid_scale, 0, x_lower * grid_scale, -func(x_lower) * grid_scale)
  stroke(255, 0, 0)
  line(x_upper * grid_scale, 0, x_upper * grid_scale, -func(x_upper) * grid_scale)

  // plot function
  plot(func, -5, 5, 50, grid_scale)

  // show bars
  n_bars = pow(2, bar_slider.value())
  bar_size = (x_upper - x_lower) / n_bars
  strokeWeight(1)
  stroke(0, 0, 255, 20)
  fill(0, 0, 255, 50)
  for (var i = 0; i < n_bars; i++) {
    let x = (x_lower + i * bar_size) * grid_scale
    let y = -func(x_lower + i * bar_size) * grid_scale
    let w = bar_size * grid_scale
    let h = -y
    rect(x, y, w, h)
  }
}

function func(x) {
  return 0.1 * pow(x, 3) - 0.4 * pow(x, 2) - 2 + 4
}

function plot(f, x_min = -10., x_max = 10., n_steps = 200, scl = 1.) {
  step_size = (x_max - x_min) / n_steps
  strokeWeight(2)
  stroke(0, 0, 255)
  noFill()
  beginShape()
  for (var i = 0; i < n_steps; i++) {
    x = x_min + i * step_size
    y = f(x)
    vertex(x * scl, -y * scl)
  }
  endShape()
  return
}