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

async function deleteUser(userId) {
  const deleteApiUrl = `${apiUrl}/${encodeURIComponent(userId)}`;
  try {
    const response = await fetch(deleteApiUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Algo deu errado");
    }
    localStorage.removeItem("userId");
    fetchData();
  } catch (error) {
    console.error(error);
  }
}

async function editUser(userId, updateUserData) {
  const updateApiUrl = `${apiUrl}/${encodeURIComponent(userId)}`;

  try {
    const response = await fetch(updateApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    });
    const data = await response.json();
    console.log("Resposta da api de atualização", data);
    localStorage.removeItem("userId");
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
    let deleteIcon = document.createElement("i");
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
    let editIcon = document.createElement("i");
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

document.addEventListener("click", function (event) {
  if (event.target.id === "delete-users-action") {
    const userId = event.target.getAttribute("delete-item-id");
    localStorage.setItem("userId", userId);

    let modalDelete = document.querySelector(".modal-delete-user");
    modalDelete.style.display = "flex";
  }
});

let confirmDeleteButton = document.querySelector(".confirm-delete-user");
confirmDeleteButton.addEventListener("click", async function () {
  let userId = localStorage.getItem("userId");

  if (userId) {
    await deleteUser(userId);
  }

  let modalDelete = document.querySelector("modal-delete-user");
  modalDelete.style.display = "none";
});

document.addEventListener("click", function (event) {
  if (event.target.id === "edit-users-action") {
    const userId = event.target.getAttribute("edit-item-id");
    localStorage.setItem("userId", userId);

    const row = event.target.closest("tr");
    if (row) {
      const cells = row.getElementsByTagName("td");

      if (cells.length > 0) {
        const name = cells[0].textContent;
        const email = cells[1].textContent;
        const password = cells[2].textContent;

        const modalEditUsers = document.querySelector(".modal-edit-users");
        modalEditUsers.style.display = "flex";

        document.getElementById("name-user-edit").value = name;
        document.getElementById("email-user-edit").value = email;
        document.getElementById("password-user-edit").value = password;
      }
    } else {
      console.error("Linha da tabela não foi encontrada.");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const formEditUser = document.querySelector(".form-edit-users");
  formEditUser.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name-user-edit").value;
    const email = document.getElementById("email-user-edit").value;
    const password = document.getElementById("password-user-edit").value;

    const updateUserData = {
      name,
      email,
      password,
    };

    const userId = localStorage.getItem("userId");

    if (userId) {
      await editUser(userId, updateUserData);
    }
    const modalEditUsers = document.querySelector(".modal-edit-users");
    modalEditUsers.style.display = "none";
  });
});
