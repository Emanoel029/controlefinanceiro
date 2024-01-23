const apiUrl = "http://localhost:5000/api/users";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Algo deu errado!");
    }
    const data = await response.json();
    updateTable(data);
  } catch (error) {
    console.error(error);
  }
}

async function createUser(userData) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = response.json();
    console.log("Resposta da API", data);
    fetchData();
  } catch (error) {
    console.error(error);
  }
}

function updateTable(data) {
  let tbody = document.querySelector(".values-items tbody");
  tbody.innerHTML = "";

  data.forEach(function (user) {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    let emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    let passwordCell = document.createElement("td");
    passwordCell.textContent = user.password;
    passwordCell.style.display = "none";
    row.appendChild(passwordCell);

    let actionsCell = document.createElement("td");
    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions-table");

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("content-delete");
    let deleteIcon = document.createElement("svg");

    deleteIcon.classList.add("bi", "bi-trash", "delete-icon");
    deleteIcon.setAttribute("delete-item-id", user.id);
    deleteIcon.id = "delete-users-action";
    deleteDiv.appendChild(deleteIcon);
    let deleteSpan = document.createElement("span");
    deleteSpan.classList.add("hover-delete");
    deleteSpan.textContent = "Deletar";
    deleteDiv.appendChild(deleteSpan);
    actionsDiv.appendChild(deleteDiv);

    let editDiv = document.createElement("div");
    editDiv.classList.add("content-edit");
    let editIcon = document.createElement("svg");
    editIcon.classList.add("bi", "bi-pencil-fill", "edit-icon");
    editIcon.setAttribute("edit-item-id", user.id);
    editIcon.id = "edit-users-action";
    editDiv.appendChild(editIcon);
    let editSpan = document.createElement("span");
    editSpan.classList.add("hover-edit");
    editSpan.textContent = "Editar";
    editDiv.appendChild(editSpan);
    actionsDiv.appendChild(editDiv);

    actionsCell.appendChild(actionsDiv);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

document.addEventListener("DOMContentLoaded", function () {
  const addButon = document.getElementById("add-new-user");
  addButon.addEventListener("click", function () {
    const modalAddUsers = document.querySelector("modal-add-users");
    modalAddUsers.style.display = "flex";
  });

  const formAddUsers = document.querySelector(".form-add-users");
  formAddUsers.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name-user").value;
    const email = document.getElementById("email-user").value;
    const password = document.getElementById("password-user").value;

    const userData = {
      name,
      email,
      password,
    };

    await createUser(userData);

    const modalAddUsers = document.querySelector(".modal-add-users");
    modalAddUsers.style.display = "none";
  });
});
