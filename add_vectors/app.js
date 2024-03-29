let grid_scale = 20;
let origin_x;
let origin_y;
let end_x;
let end_y;
let n_x;
let n_y;
let v_0;
let v_1;
let v_2;
let drag_1 = false;
let drag_2 = false;
let mouse_pos;

let app_canvas;
let controlls_size = {
  x: 150,
  y: 0
}

const fps = 30;
const canvas_window_ratio = {
  x: .9,
  y: .8
}

let controlls = {};

function config_canvas(new_canvas = false) {
  if (new_canvas) {
    app_canvas = createCanvas(windowWidth * canvas_window_ratio.x, windowHeight * canvas_window_ratio.y);
    app_canvas.parent('app_holder');
  } else {
    resizeCanvas(windowWidth * canvas_window_ratio.x, windowHeight * canvas_window_ratio.y);
  }
  origin_x = -width / 2;
  origin_y = -height / 2;
  end_x = width / 2;
  end_y = height / 2;
  n_x = floor(width / grid_scale);
  n_y = floor(height / grid_scale);
}

function setup_controlls() {
  let x_off = app_canvas.position().x + 15;
  let y_off = app_canvas.position().y + 15;
  let y_ext = 30;
  let elements = Object.values(controlls);
  for (var i = 0; i < elements.length; i++) {
    elements[i].position(x_off, y_off + i * y_ext);
  }
  controlls_size.y = elements.length * 30 + 20
}

function draw_controlls() {
  strokeWeight(2)
  stroke(0)
  fill(255)
  rect(origin_x + 5, origin_y + 5, controlls_size.x, controlls_size.y)
}

function setup() {
  config_canvas(true)
  frameRate(fps)

  controlls.label_checkbox = createCheckbox('labels', true);
  controlls.add_checkbox = createCheckbox('add vectors', false);
  controlls.snap_checkbox = createCheckbox('snap to grid', false);
  controlls.scale = createDiv('Zoom');
  controlls.scale_slider = createSlider(grid_scale, 200, 80).style('width', (controlls_size.x - 30) + 'px');
  setup_controlls()

  v_0 = new vec2(0, 0);
  v_1 = new vec2(3, 2);
  v_2 = new vec2(4, -1);
}

function draw() {
  config_canvas()
  background(200);
  translate(width / 2, height / 2);
  grid_scale = controlls.scale_slider.value();
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
  text('y', -20, origin_y + 20)
  textSize(10)
  if (controlls.label_checkbox.checked()) {
    strokeWeight(0);
    for (x_i = -floor(n_x / 2); x_i <= n_x; ++x_i) {
      text(x_i, x_i * grid_scale + 5, -5)
    }
    for (y_i = -floor(n_y / 2); y_i <= n_y; ++y_i) {
      text(-y_i, 5, y_i * grid_scale - 5)
    }
  }

  if (drag_1) {
    if (controlls.snap_checkbox.checked()) {
      v_1 = mouse_pos.round()
    } else {
      v_1 = mouse_pos
    }
  } else if (drag_2) {
    if (controlls.snap_checkbox.checked()) {
      v_2 = mouse_pos.round()
    } else {
      v_2 = mouse_pos
    }
  }

  // draw vector arrows
  // 1
  strokeWeight(2);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  v_1.draw_arrow(grid_scale);
  textSize(10);
  strokeWeight(0);
  fill(0);
  v_1.label_head(grid_scale);

  // 2
  strokeWeight(2);
  stroke(0, 0, 255);
  fill(0, 0, 255);
  v_2.draw_arrow(grid_scale)
  textSize(10);
  strokeWeight(0);
  fill(0);
  v_2.label_head(grid_scale);

  // 1 + 2
  if (controlls.add_checkbox.checked()) {
    strokeWeight(2);
    stroke(0, 0, 255, 50);
    fill(0, 0, 255, 50);
    v_2.draw_arrow(grid_scale, v_1)

    strokeWeight(2);
    stroke(2550, 0, 0, 50);
    fill(255, 0, 0, 50);
    v_1.draw_arrow(grid_scale, v_2)

    strokeWeight(2);
    stroke(0, 150, 0);
    fill(0, 150, 0)
    v_1.add(v_2).draw_arrow(grid_scale)
    textSize(10);
    strokeWeight(0);
    fill(0);
    v_1.add(v_2).label_head(grid_scale);
  }

  draw_controlls()
}

function mousePressed() {
  if (mouse_pos.dist(v_1) * grid_scale < 5) {
    drag_1 = true;
  } else if (mouse_pos.dist(v_2) * grid_scale < 5) {
    drag_2 = true;
  }
}

function mouseReleased() {
  drag_1 = false;
  drag_2 = false;
}