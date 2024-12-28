import { log } from "console";
import { TaskStatus, TaskStorage } from "./src/storage";

const storage = new TaskStorage();

enum Command {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
  MARK_IN_PROGRESS = 'mark-in-progress',
  MARK_DONE = 'mark-done',
  LIST = 'list'
}

async function commitCommand(command: Command, params: any) {
  switch (command) {
    case Command.ADD:
      await storage.addTask(params[0]);
      break;
    case Command.UPDATE:
      await storage.updateTask(Number(params[0]), params[1]);
      break;
    case Command.DELETE:
      await storage.deleteTask(Number(params[0]));
      break;
    case Command.MARK_IN_PROGRESS:
      await storage.changeStatus(Number(params[0]), TaskStatus.IN_PROGRESS);
      break;
    case Command.MARK_DONE:
      await storage.changeStatus(Number(params[0]), TaskStatus.DONE);
      break;
    case Command.LIST:
      await storage.listTasks(params[0]);
      break;
    default:
      console.log('!!!-----------------UKNOWN COMMAND---------------!!!');
      console.log('Available commands:');
      console.log('add <description>');
      console.log('update <id> <description>');
      console.log('delete <id>');
      console.log('mark-in-progress <id>');
      console.log('mark-done <id>');
      console.log('list [todo|in-progress|done]');
  }
}

async function main(argv: any[]) {
  await storage.setupTasks();
  const [commandName, ...commandParams] = argv;
  await commitCommand(commandName, commandParams);
}

main(process.argv.slice(2))