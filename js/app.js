import "../styles/app.scss";

const html = document.documentElement;
const canvas = document.querySelector(".object-scroll");
const context = canvas.getContext("2d");

const [red, green, blue] = [225, 225, 225];
const tag = document.querySelector("h1");

const currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
    .toString()
    .padStart(4, "0")}.jpg`;

const frameCount = 147;

canvas.height = 770;
canvas.width = 1158;
const image = new Image();
image.src = currentFrame(1);
image.onload = function () {
  context.drawImage(image, 0, 0);
};

const updateImage = (index) => {
  image.src = currentFrame(index);
  context.drawImage(image, 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - (window.innerHeight - 400);
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  
  let y = 1 + (window.scrollY || window.pageYOffset) / 150;
  y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to elastic scroll)
  const [r, g, b] = [red / y, green / y, blue / y].map(Math.round);
  tag.style.color = `rgb(${r}, ${g}, ${b})`;

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const image = new Image();
    image.src = currentFrame(i);
  }
};

preloadImages();
