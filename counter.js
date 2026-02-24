let counter = 0;
const target = 10;
const speed = 80;
const yearCounter = document.getElementById("yearCounter");

const interval = setInterval(() => {
  counter++;
  yearCounter.innerText = counter;
  if (counter >= target) clearInterval(interval);
}, speed);