const inputValue = document.querySelector("#check-value");
const inputButton = document.querySelector(".button");

function checkChekcbox() {
  if (this.checked) {
    inputButton.disabled = false;
  } else {
    inputButton.disabled = true;
  }
}

inputValue.addEventListener("change", checkChekcbox);
