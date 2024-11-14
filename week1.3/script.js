const form = document.querySelector("#form");
const title = document.querySelector("#title");
const date = document.querySelector("#date");
const description = document.querySelector("#description");
const todoListContainer = document.querySelector(".todo-list-container");
const todos = []; // Array to store all to-do items

// Function to render the to-do list
const renderTodoList = () => {
  todoListContainer.innerHTML = ""; // Clear current list
  todos.forEach((todo, index) => {
    const todoItem = `
      <div class="todo-list ${
        todo.completed ? "completed" : ""
      }" data-index="${index}">
        <ul>
          <li><h2>${todo.title}</h2></li>
          <li><p><strong>Description:</strong> ${todo.description}</p></li>
        </ul>
        <div class="cta-container">
          <div>
            <input type="checkbox" ${
              todo.completed ? "checked" : ""
            } onclick="toggleComplete(${index})" />
          </div>
          <div class="cta-icons">
            <p>Due: ${todo.date}</p>
            <p class="edit" onclick="editTodo(${index})"><i class="fa-regular fa-pen-to-square"></i></p>
            <p class="delete" onclick="deleteTodo(${index})"><i class="fa-solid fa-trash"></i></p>
          </div>
        </div>
      </div>`;
    todoListContainer.insertAdjacentHTML("beforeend", todoItem);
  });
};

// Function to handle adding a new to-do item
const handleTodo = (e) => {
  e.preventDefault();
  // Trim input values
  const titleValue = title.value.trim();
  const dateValue = date.value.trim();
  const descriptionValue = description.value.trim();

  // Basic form validation
  if (!titleValue || !dateValue || !descriptionValue) {
    alert("Please fill in all required fields (title, date, and description)");
    return;
  }

  // Create a new to-do object
  const todo = {
    title: titleValue,
    date: dateValue,
    description: descriptionValue,
    completed: false,
  };

  todos.push(todo); // Add to array
  renderTodoList(); // Re-render the list

  // Clear input fields after adding the todo
  title.value = "";
  date.value = "";
  description.value = "";
};

// Function to toggle the completion status
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
  console.log(todos);
};

// Function to delete a to-do item with confirmation
const deleteTodo = (index) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this to-do item?"
  );
  if (confirmDelete) {
    todos.splice(index, 1); // Remove item from array
    renderTodoList();
  }
};

// Function to edit an existing to-do item
const editTodo = (index) => {
  const todo = todos[index];
  title.value = todo.title;
  date.value = todo.date;
  description.value = todo.description;

  // Temporarily change the submit button to "Save Edit"
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.textContent = "Save Edit";

  const saveEdit = (e) => {
    e.preventDefault();
    todo.title = title.value.trim();
    todo.date = date.value.trim();
    todo.description = description.value.trim();

    if (!todo.title || !todo.date || !todo.description) {
      alert(
        "Please fill in all required fields (title, date, and description)"
      );
      return;
    }

    // Clear form and reset event listeners
    title.value = "";
    date.value = "";
    description.value = "";
    submitButton.textContent = "Add Todo";

    // Restore the original submit event listener
    form.removeEventListener("submit", saveEdit);
    form.addEventListener("submit", handleTodo);

    renderTodoList();
  };

  // Switch event listener to handle editing
  form.removeEventListener("submit", handleTodo);
  form.addEventListener("submit", saveEdit);
};


// Function to sort to-do items by due date/time
const sortTodosByDate = (ascending = true) => {
  todos.sort((a, b) =>
    ascending
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
  renderTodoList();
};

// Event listener for form submission
form.addEventListener("submit", handleTodo);

// Select the sort buttons and add event listeners for sorting
document
  .getElementById("sortAsc")
  .addEventListener("click", () => sortTodosByDate(true));
document
  .getElementById("sortDesc")
  .addEventListener("click", () => sortTodosByDate(false));
