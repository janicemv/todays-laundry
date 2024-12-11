// Class representing an individual task
class Task {
    constructor(text, completed = false) {
      this.text = text;
      this.completed = completed; // Task is initially not completed
    }
  
    // Create the task's list item element
    createTaskElement() {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "align-items-center");
  
      const switchContainer = document.createElement("div");
      switchContainer.classList.add("form-switch", "me-3");
  
      const switchInput = document.createElement("input");
      switchInput.classList.add("form-check-input");
      switchInput.type = "checkbox";
      switchInput.checked = this.completed; // Set the checkbox based on task completion status
      switchInput.addEventListener("change", this.toggleTaskStatus.bind(this));
  
      switchContainer.appendChild(switchInput);
  
      const taskLabel = document.createElement("span");
      taskLabel.textContent = this.text;
      taskLabel.classList.add("ms-2");
      if (this.completed) {
        taskLabel.style.textDecoration = "line-through"; // Apply strike-through if task is completed
      }
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("btn", "btn-sm", "delete");
      deleteButton.addEventListener("click", this.deleteTask.bind(this));
  
      listItem.appendChild(switchContainer);
      listItem.appendChild(taskLabel);
      listItem.appendChild(deleteButton);
  
      return listItem;
    }
  
    // Toggle the completion status of the task
    toggleTaskStatus(event) {
      const taskLabel = event.target.closest("li").querySelector("span");
      this.completed = event.target.checked;
      taskLabel.style.textDecoration = this.completed ? "line-through" : "none";
      todoList.saveTasksToLocalStorage(); // Save tasks after updating completion status
    }
  
    // Delete the task from the list
    deleteTask(event) {
      const taskList = document.getElementById("taskList");
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      todoList.removeTask(this); // Remove the task from the tasks array
      todoList.saveTasksToLocalStorage(); // Save updated tasks to localStorage
    }
}

// Class managing the to-do list
class TodoList {
    constructor() {
      this.tasks = []; // Array to hold tasks
      this.taskInput = document.getElementById("taskInput");
      this.taskListElement = document.getElementById("taskList");
  
      // Load tasks from localStorage if any
      this.loadTasksFromLocalStorage();
  
      // Event listener for the add task button
      document.getElementById("addTaskBtn").addEventListener("click", this.addTask.bind(this));
  
      // Event listener for Enter key press to add task
      this.taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          this.addTask();
        }
      });
    }
  
    // Add a new task to the list
    addTask() {
      const taskText = this.taskInput.value.trim();
      if (taskText !== "") {
        const task = new Task(taskText);
        this.tasks.push(task);
        this.renderTask(task);
        this.taskInput.value = ""; // Clear the input field
        this.saveTasksToLocalStorage(); // Save tasks to localStorage after adding
      }
    }
  
    // Render a task in the list
    renderTask(task) {
      const taskElement = task.createTaskElement();
      this.taskListElement.appendChild(taskElement);
    }
  
    // Save the tasks array to localStorage
    saveTasksToLocalStorage() {
      const tasksData = this.tasks.map(task => ({
        text: task.text,
        completed: task.completed
      }));
      localStorage.setItem("tasks", JSON.stringify(tasksData)); // Save tasks in localStorage
    }
  
    // Load tasks from localStorage
    loadTasksFromLocalStorage() {
      const tasksData = JSON.parse(localStorage.getItem("tasks"));
      if (tasksData) {
        tasksData.forEach(taskData => {
          const task = new Task(taskData.text, taskData.completed);
          this.tasks.push(task);
          this.renderTask(task); // Render each task from localStorage
        });
      }
    }
  
    // Remove a task from the tasks array
    removeTask(task) {
      this.tasks = this.tasks.filter(t => t !== task);
    }
}

// Initialize the to-do list when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.todoList = new TodoList(); // Create an instance of the TodoList class
});
