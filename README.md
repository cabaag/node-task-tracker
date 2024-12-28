# Task tracker

## Install dependencies
Run `pnpm install` to install dependencies for project

## Run project
Run `pnpm run start [command]` to execute any action, available commands are below

### add
Adds a new task

params:
```
description: string
```

### delete
Delete a task defined by ID

params
```
id: number
```

### update
Update a task defined by ID

params
```
id: number
description: Update to the task
```

### mark-in-prorgess
Change the status of the task to 'mark-in-progress'

params
```
id: number
```

### mark-done
Change the status of the task to 'done'

params
```
id: number
```

### list
List tasks defined by status if status, else list all

params
```
status?: 'done'|'todo'|'in-progress'
```

## Test project
Run `pnpm run test` to run coverage testing