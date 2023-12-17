//rotação do meu
const toggleMenuButton = document.querySelector(".toggle-menu");
const menuListe = document.querySelector(".menu-dashboard ul");
const icon = toggleMenuButton;

let isNotClicked = false;

toggleMenuButton.addEventListener("click", () => {
  if (isNotClicked) {
    menuListe.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  } else {
    menuListe.style.display = "block";
    icon.style.transform = "rotate(90deg)";
  }

  isNotClicked = !isNotClicked; //se a variável era true, vira false e vice versa
});
