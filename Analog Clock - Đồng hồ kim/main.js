let imgClock;
let clockInfo;
let clockLoaded = false;
let width;
let height;

function preload() {
	const imageNames = [
		'hiclipart.com.png',
		'hiclipart-2.png',
		'hiclipart-rolex.png',
		'145-1453111_file-custom-watch-face-dial-template-base-clock.png',
	];
	imgClock = loadImage(imageNames[0], (img) => {
		width = windowWidth - 30;
		height = windowHeight - 30;
		img.width = (width > height ? height : width) - 10;
		img.height = (width < height ? width : height) - 10;
		clockInfo = {
			// x: 0,
			// y: 0,
			x: (width - img.width) / 2,
			y: (height - img.height) / 2,
			centerX: img.width / 2,
			centerY: img.height / 2,
			radius: img.width / 2,
		};
		console.log(clockInfo);
		clockLoaded = true;
	});
}

function setup() {
	createCanvas(width, height);
	frameRate(1);
}

function draw() {
	background(255);
	drawClock();
}

function drawClock() {
	if (!clockLoaded) return;
	image(imgClock, clockInfo.x, clockInfo.y);
	drawInfo(clockInfo);
}

function drawInfo(clockInfo) {
	translate(clockInfo.x + clockInfo.centerX, clockInfo.y + clockInfo.centerY);
	drawingContext.shadowOffsetX = 5;
	drawingContext.shadowOffsetY = 5;
	drawingContext.shadowBlur = 15;
	drawingContext.shadowColor = 'gray';
	drawYearInfo(clockInfo);
	drawHourHand(clockInfo);
	drawMinuteHand(clockInfo);
	drawSecondHand(clockInfo);
}

function drawSecondHand(clockInfo) {
	const thickness = int(clockInfo.radius * 0.01);
	const color = 'red';
	const width = clockInfo.radius * 0.8;
	push();
	stroke(color);
	fill(color);
	// circle(0, 0, 20);
	rotate(-PI / 2 + new Date().getSeconds() * ((2 * PI) / 60));
	triangle(width, 0, 0, thickness, 0, -thickness);
	rect(-width * 0.3, -thickness * 2, width * 0.3, thickness * 4);
	fill('white');
	circle(0, 0, int(clockInfo.radius * 0.067));
	circle(width, 0, int(clockInfo.radius * 0.03));
	pop();
}

function drawMinuteHand(clockInfo) {
	const thickness = int(clockInfo.radius * 0.02);
	const color = 'blue';
	push();
	stroke(color);
	fill(color);
	rotate(-PI / 2 + new Date().getMinutes() * ((2 * PI) / 60));
	triangle(0, 0, 15, thickness, 15, -thickness);
	triangle(clockInfo.radius * 0.78, 0, 15, thickness, 15, -thickness);
	pop();
}

function drawHourHand(clockInfo) {
	const thickness = int(clockInfo.radius * 0.03);
	const color = 'green';
	const date = new Date();
	push();
	stroke(color);
	fill(color);
	rotate(
		-PI / 2 + date.getHours() * ((2 * PI) / 12) + date.getMinutes() / 120
	);
	triangle(0, 0, 15, thickness, 15, -thickness);
	triangle(clockInfo.radius * 0.4, 0, 15, thickness, 15, -thickness);
	pop();
}

function drawYearInfo(clockInfo) {
	const MONTHS = [
		'Giêng',
		'Hai',
		'Ba',
		'Tư',
		'Năm',
		'Sáu',
		'Bảy',
		'Tám',
		'Chín',
		'Mười',
		'Mười Một',
		'Mười Hai',
	];
	const y = int(clockInfo.radius * 0.45);
	const date = new Date();
	const year = date.getFullYear();
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const dayMonth = day + ' tháng ' + month;
	textSize(int(clockInfo.radius * 0.17));
	fill('DarkOrange');
	text(year, -textWidth(year) / 2, y);
	textSize(int(clockInfo.radius * 0.1));
	text(dayMonth, -textWidth(dayMonth) / 2, y * 0.55);

	textSize(int(clockInfo.radius * 0.1));
	fill('LimeGreen');
	text(
		'Code là Ghiền',
		-textWidth('Code là Ghiền') / 2,
		-clockInfo.radius * 0.35
	);
	textSize(int(clockInfo.radius * 0.05));
	text('Huy Nguyễn', -textWidth('Huy Nguyễn') / 2, -clockInfo.radius * 0.25);
}
