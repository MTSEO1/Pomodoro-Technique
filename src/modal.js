function displaySet() {
  setting.classList.toggle('hidden');
  console.log(setting);
}
const openSet = document.getElementById('open-set');
const setting = document.querySelector('.setting');
const setBackground = document.querySelector('.settings-background');
const closeSet = document.getElementById('close-set');

openSet.addEventListener('click', displaySet);
setBackground.addEventListener('click', displaySet);
closeSet.addEventListener('click', displaySet);

export { displaySet };
