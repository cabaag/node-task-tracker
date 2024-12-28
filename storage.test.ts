import { TaskStatus, TaskStorage } from "./src/storage";

const storage = new TaskStorage();

describe('TaskStorage', () => {
  beforeAll(async () => {
    await storage.setupTasks();
  });
  
  it('should add a task', async () => {
    await storage.addTask('Task 1');
    await storage.addTask('Task 2');
    await storage.addTask('Task 3');
    expect(storage.tasks.length).toBe(3);
  });

  it('should delete a task', async () => {
    await storage.deleteTask(1);
    expect(storage.tasks.length).toBe(2);
  });

  it('should update a task', async () => {
    await storage.updateTask(2, 'Task 2 updated');
    const task = storage.tasks.find(task => task.id === 2);
    expect(task?.description).toBe('Task 2 updated');
  });

  it('should change status of a task', async () => {
    await storage.changeStatus(3, TaskStatus.IN_PROGRESS);
    const task = storage.tasks.find(task => task.id === 3);
    expect(task?.status).toBe(TaskStatus.IN_PROGRESS);
  })

  it('should list tasks', async () => {
    await storage.listTasks(TaskStatus.TODO);
    await storage.listTasks(TaskStatus.IN_PROGRESS);
    await storage.listTasks(TaskStatus.DONE);
  });

  it('should not delete a task that does not exist', async () => {
    await storage.deleteTask(100);
    expect(storage.tasks.length).toBe(2);
  })

  it('should not update a task that does not exist', async () => {
    await storage.updateTask(100, 'Task 100');
    const task = storage.tasks.find(task => task.id === 100);
    expect(task).toBeUndefined();
  })

  it('should not change status of a task that does not exist', async () => {
    await storage.changeStatus(100, TaskStatus.IN_PROGRESS);
    const task = storage.tasks.find(task => task.id === 100);
    expect(task).toBeUndefined();
  })

  it('should list all tasks', async () => {
    await storage.listTasks('unknown' as TaskStatus);
  })
});