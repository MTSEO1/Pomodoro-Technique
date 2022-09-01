function breakMode() {
  let contents = document.getElementById('contanier');
  if (state === 3) {
    contents.classList.toggle('break-mode');
  } else {
    contents.classList.remove('break-mode');
  }
}

export { breakMode };
