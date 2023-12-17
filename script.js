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

//mudando de cor quando troca os setor
const itensModules = document.querySelectorAll(".menu-module ul li");

itensModules.forEach((item) => {
  item.addEventListener("click", () => {
    //se esse item n contém a minha class item-module-active, add essa class, porém antes percorre em cada elemento p remover a class de todos, pois um já começa marcado.
    if (!item.classList.contains("item-module-active")) {
      itensModules.forEach((el) => {
        el.classList.remove("item-module-active");
      });
      //Add essa class(item-module-active).
      item.classList.add("item-module-active");
    }
  });
});
