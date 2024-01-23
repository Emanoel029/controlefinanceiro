//Esconder senha e mostrar senha de login
const inputPassword = document.getElementById("password");
const btnShowPassword = document.getElementById("show-password");
const btnHidePassord = document.getElementById("hide-password");

btnShowPassword?.addEventListener("click", () => {
  inputPassword.setAttribute("type", "text");
  btnShowPassword.style.display = "none";
  btnHidePassord.style.display = "block";
});

btnHidePassord?.addEventListener("click", () => {
  inputPassword.setAttribute("type", "password");
  btnHidePassord.style.display = "none";
  btnShowPassword.style.display = "block";
});

//rotação do meu
const toggleMenuButton = document.querySelector(".toggle-menu");
const menuListe = document.querySelector(".menu-dashboard ul");
const icon = toggleMenuButton;

let isNotClicked = false;

toggleMenuButton?.addEventListener("click", () => {
  if (isNotClicked) {
    menuListe.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  } else {
    menuListe.style.display = "block";
    icon.style.transform = "rotate(90deg)";
  }

  isNotClicked = !isNotClicked; //se a variável era true, vira false e vice versa
});

//mudando de cor quando troca os setor (dashboardLeft.css)
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

function setupModal(btnOpen, modal, btnClose, btnCancel) {
  const openBtn = document.getElementById(btnOpen);
  const modalElement = document.querySelector(modal);
  const closeBtn = document.querySelector(btnClose);
  const cancelBtn = document.querySelector(btnCancel);

  openBtn?.addEventListener("click", () => {
    modalElement.style.display = "flex";
  });

  closeBtn?.addEventListener("click", () => {
    modalElement.style.display = "none";
  });

  cancelBtn?.addEventListener("click", () => {
    modalElement.style.display = "none";
  });
}

// Expenses (modal)

setupModal(
  "add-new-expense",
  ".modal-add-expenses",
  ".close-modal-add-expense"
);

setupModal(
  "delete-expenses-action",
  ".modal-delete-expense",
  ".close-modal-delete-expense",
  ".cancel-delete-expense"
);

//Incomes

setupModal("add-new-income", ".modal-add-incomes", ".close-modal-add-income");
setupModal(
  "delete-incomes-action",
  ".modal-delete-income",
  ".close-modal-delete-icome",
  ".cancel-delete-income"
);

//Users
setupModal("add-new-user", ".modal-add-users", ".close-modal-add-user");
setupModal(
  "delete-users-action",
  ".modal-delete-user",
  ".close-modal-delete-user",
  ".cancel-delete-user"
);
