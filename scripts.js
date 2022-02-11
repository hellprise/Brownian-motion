const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

` 
 .getContext() позволяет обределить, с какими фигурами мы будем работать (3D или 2D).
 .fillRect() рисует фигуру с заданными параметрами в скобках: первый и второй - это координаты по x и y, а следующие два - ширина и высота.
 .fillStyle() меняет цвет фигуры.
 .moveTo() позволяет задать начальные координаты, чтобы нарисовать линию.
 .lineTo() позволяет задать конечные координаты линии.
 .strokeStyle() меняет цвет линии.
 .stroke() рисует фигуру по заданным координатам.
 .arc(x, y, radius, start, end, false) рисует окружность. принимает в качестве параметров координаты x и y, радиус окружности, начальный угол в радианах, конечный угол в радианах, направление.
 .beginPath() говорит, что мы начинаем рисовать новый элемент (чтобы, допустим, если мы рисуем линию, она не продлевалась к следующей фигуре)
 .clearRect(x, y, width, height) позволяет обновлять рисунок (например, мы создали ф-цию, которая рисует окружность по оси х. и проблема заключается в том, что окружности будут рисоваться на каждой точке нашей оси. этот метод исправляет эту проблему.)
 `;

const c = canvas.getContext('2d');

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Math.PI == 2/Пи (Пи = 3.14...)
    c.strokeStyle = '#5333ed';
    c.stroke();

    c.fillStyle = this.color;
    c.fill();

    this.update();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// случайное челое число в заданном промежутке:
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colorsArr = [
  '#e26a6a',
  '#d2527f',
  '#f22613',
  '#1e824c',
  '#c8f7c5',
  '#a2ded0',
  '#e87e04',
  '#1f3a93',
  '#013243',
  '#336e7b',
  '#293133',
  '#2F4F4F',
  '#A8E4A0',
  '#FFDEAD',
  '#003153',
  '#1E5945',
  '#30D5C8',
  '#AFEEEE',
  '#8A7F8E',
  '#480607',
  '#009B76',
];
const circlesArr = [];

for (let i = 0; i < 1000; i++) {
  const radius = 10;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;

  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dy = (Math.random() - 0.5) * 2;

  const colorIndex = randomInteger(1, colorsArr.length);
  circlesArr.push(new Circle(x, y, dx, dy, radius, colorsArr[colorIndex]));
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circlesArr.length; i++) {
    circlesArr[i].draw();
  }
}

animate();
