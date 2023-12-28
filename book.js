const form = document.querySelector("form");

let bookData = JSON.parse(localStorage.getItem("bookData")) || [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Auston",
    pages: "500",
    status: "read",
  },
];

let editingId = null;

const saveToLocalStorage = () => {
  localStorage.setItem("bookData", JSON.stringify(bookData));
};

const renderTable = () => {
  const tableBody = document.querySelector("#book-data tbody");
  tableBody.innerHTML = "";

  bookData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.author}</td>
      <td>${item.pages}</td>
      <td>${item.status}</td>
      <td class="actions">
          <button onclick="editBookItem(${item.id})">
          <i class="fa-solid fa-pen-to-square fa-2xl" style="color: #fff"></i>
          </button>
          <button onclick="deleteBookItem(${item.id})">
          <i class="fa-solid fa-trash fa-2xl" style="color: #fff"></i>
          </button>
      </td>
    `;
    row.classList.add("book-row");
    tableBody.appendChild(row);
  });
  saveToLocalStorage();
};

const addBookItem = (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("page-number").value;
  const status = document.querySelector('input[name="read-not-read"]:checked')
    ? document.querySelector(`input[name="read-not-read"]:checked`).value
    : "";

  if (title && author && pages && status) {
    if (editingId !== null) {
      // Editing existing item
      const editedItemIndex = bookData.findIndex(
        (item) => item.id === editingId
      );
      bookData[editedItemIndex] = {
        id: editingId,
        title,
        author,
        pages,
        status,
      };
      editingId = null;
    } else {
      // Adding new item
      const newBookItem = {
        id: bookData.length + 1,
        title,
        author,
        pages,
        status,
      };
      bookData.push(newBookItem);
    }

    form.reset();
    renderTable();
  } else {
    alert("Please fill in all fields!");
  }
};

const editBookItem = (id) => {
  editingId = id;
  const selectedItem = bookData.find((item) => item.id === id);

  // Fill the form with the selected item's data
  document.getElementById("title").value = selectedItem.title;
  document.getElementById("author").value = selectedItem.author;
  document.getElementById("page-number").value = selectedItem.pages;
  document.querySelector(
    `input[name="read-not-read"][value="${selectedItem.status}"]`
  ).checked = true;
};

const deleteBookItem = (id) => {
  bookData = bookData.filter((item) => item.id !== id);
  renderTable();
};

form.addEventListener("submit", addBookItem);
renderTable();
