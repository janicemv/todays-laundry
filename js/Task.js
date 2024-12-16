"use strict";

export class Task {
    constructor(text, completed = false) {
      this.text = text;
      this.completed = completed;
    }
  
    createTaskElement() {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "align-items-center");
  
      const switchContainer = document.createElement("div");
      switchContainer.classList.add("form-switch", "me-3");
  
      const switchInput = document.createElement("input");
      switchInput.classList.add("form-check-input");
      switchInput.type = "checkbox";
      switchInput.checked = this.completed;
      switchInput.addEventListener("change", this.toggleTaskStatus.bind(this));
  
      switchContainer.appendChild(switchInput);
  
      const taskLabel = document.createElement("span");
      taskLabel.textContent = this.text;
      taskLabel.classList.add("ms-2");
      if (this.completed) {
        taskLabel.style.textDecoration = "line-through";
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
  
    toggleTaskStatus(event) {
      const taskLabel = event.target.closest("li").querySelector("span");
      this.completed = event.target.checked;
      taskLabel.style.textDecoration = this.completed ? "line-through" : "none";
      todoList.saveTasksToLocalStorage();
    }
  
    deleteTask(event) {
      const taskList = document.getElementById("taskList");
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      todoList.removeTask(this);
      todoList.saveTasksToLocalStorage();
    }
}
