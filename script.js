let taskId = 1; // Initialize task numbering
const todoList = document.getElementById("todo-list");
const addTaskBtn = document.getElementById("add-task-btn");
const todoInput = document.getElementById("todo-input");
const previewBtn = document.getElementById("preview-btn");
const downloadBtn = document.getElementById("download-btn");
const previewContainer = document.getElementById("preview-container");

// Function to add a task
addTaskBtn.addEventListener("click", function () {
  const taskText = todoInput.value.trim();
  if (taskText) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
      <div class="task-item d-flex justify-content-between align-items-center">
        <span>
          <strong class="task-number">${taskId}</strong>. ${taskText}
        </span>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(listItem);
    todoInput.value = ""; // Clear the input field
    taskId++; // Increment the task number
  } else {
    alert("Please enter a task before adding.");
  }
});

// Function to delete a task and reassign task numbers
todoList.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-btn")) {
    const taskItem = event.target.closest("li");
    taskItem.remove();
    reassignTaskNumbers(); // Reassign task numbers after deletion
  }
});

// Reassign task numbers
function reassignTaskNumbers() {
  const tasks = [...todoList.getElementsByClassName("list-group-item")];
  tasks.forEach((task, index) => {
    const taskNumber = task.querySelector(".task-number");
    taskNumber.textContent = index + 1; // Reassign number starting from 1
  });
  taskId = tasks.length + 1; // Update the next task ID
}

// Function to preview the task list
previewBtn.addEventListener("click", function () {
  const tasks = [...todoList.getElementsByClassName("list-group-item")];
  previewContainer.innerHTML = ""; // Clear any previous preview

  if (tasks.length > 0) {
    const previewDiv = document.createElement("div");
    previewDiv.classList.add("alert", "alert-info", "mt-3");
    previewDiv.innerHTML = "<h5>Task Preview:</h5><ul>";

    tasks.forEach((task) => {
      const taskNumber = task.querySelector(".task-number").textContent;
      const taskText = task.querySelector("span").textContent.split(". ")[1];
      previewDiv.innerHTML += `<li>Task ${taskNumber}: ${taskText}</li>`;
    });

    previewDiv.innerHTML += "</ul>";
    previewContainer.appendChild(previewDiv);
  } else {
    previewContainer.innerHTML =
      "<div class='alert alert-warning'>No tasks to preview.</div>";
  }
});

// Function to download the task list as a PDF
downloadBtn.addEventListener("click", function () {
  const tasks = [...todoList.getElementsByClassName("list-group-item")];
  if (tasks.length > 0) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("To-Do List", 20, 20);

    tasks.forEach((task, index) => {
      const taskNumber = task.querySelector(".task-number").textContent;
      const taskText = task.querySelector("span").textContent.split(". ")[1];
      doc.text(`${index + 1}. ${taskText}`, 20, 30 + index * 10);
    });

    doc.save("todo-list.pdf");
  } else {
    alert("No tasks to download.");
  }
});
