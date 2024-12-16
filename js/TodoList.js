"use strict";

import { Task } from "./Task.js";

export class TodoList {
    constructor() {
      this.tasks = [];
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

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText !== "") {
          const task = new Task(taskText);
          this.tasks.push(task);
          this.renderTask(task);
          this.taskInput.value = ""; 
          this.saveTasksToLocalStorage();
        }
      }
    
      renderTask(task) {
        const taskElement = task.createTaskElement();
        this.taskListElement.appendChild(taskElement);
      }
    
      saveTasksToLocalStorage() {
        const tasksData = this.tasks.map(task => ({
          text: task.text,
          completed: task.completed
        }));
        localStorage.setItem("tasks", JSON.stringify(tasksData));
      }
    
      loadTasksFromLocalStorage() {
        const tasksData = JSON.parse(localStorage.getItem("tasks"));
        if (tasksData) {
          tasksData.forEach(taskData => {
            const task = new Task(taskData.text, taskData.completed);
            this.tasks.push(task);
            this.renderTask(task); 
          });
        }
      }
    
      removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
      }
  }