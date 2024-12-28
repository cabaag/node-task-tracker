import { readFile, writeFile } from "node:fs/promises";

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

type Task = {
  id: number,
  description: string,
  status: TaskStatus
  createdAt: Date,
  updatedAt: Date
}

export class TaskStorage {
  tasks: Task[] = [];
  id: number = 1;
  fileName = process.env.NODE_ENV === 'test' ? 'tasks-test.json' : 'tasks.json';
  isTest = process.env.NODE_ENV === 'test';

  constructor() {
  }

  async setupTasks() {
    return readFile(this.fileName, 'utf-8')
      .then((data) => {
        if (!this.isTest) {
          this.tasks = JSON.parse(data)
          const nextId = this.tasks.length > 0
            ? this.tasks[this.tasks.length - 1].id + 1
            : 1;
          this.id = nextId
        }
      }).catch((error) => {
        this.tasks = []
      })
  }

  async saveRecords() {
    return writeFile(this.fileName, JSON.stringify(this.tasks))
      .then(() => {
        console.log('File saved')
      })
  }

  async addTask(description: string) {
    this.tasks.push({
      id: this.id++,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await this.saveRecords()
  }

  async deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
      return this.saveRecords()
    } else {
      console.log('Task not found')
    }
  }

  async updateTask(id: number, description: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].description = description;
      this.tasks[taskIndex].updatedAt = new Date();
      return this.saveRecords()
    } else {
      console.log('Task not found')
    }
  }

  async changeStatus(id: number, status: TaskStatus) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].status = status;
      this.tasks[taskIndex].updatedAt = new Date();
      return this.saveRecords()
    } else {
      console.log('Task not found')
    }
  }

  async listTasks(status: TaskStatus) {
    switch (status) {
      case TaskStatus.TODO:
        this.tasks
          .filter(task => task.status === TaskStatus.TODO)
          .forEach(task => console.log(task))
        break;
      case TaskStatus.IN_PROGRESS:
        this.tasks
          .filter(task => task.status === TaskStatus.IN_PROGRESS)
          .forEach(task => console.log(task))
        break;
      case TaskStatus.DONE:
        this.tasks
          .filter(task => task.status === TaskStatus.DONE)
          .forEach(task => console.log(task))
        break;
      default:
        this.tasks.forEach(task => console.log(task))
    }
  }
}