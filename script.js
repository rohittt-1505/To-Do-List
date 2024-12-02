// Select elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Add task function
function addTask() {
  const task = input.value.trim();
  if (task === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    <span>${task}</span>
    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
  `;

  todoList.appendChild(li);
  input.value = '';

  // Add animation
  li.style.animation = 'fade-in 0.5s ease-in-out';

  // Delete functionality
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.style.animation = 'fade-out 0.5s ease-in-out';
    setTimeout(() => li.remove(), 500);
  });
}

// Button click event
addBtn.addEventListener('click', addTask);

// Press Enter key to add task
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
