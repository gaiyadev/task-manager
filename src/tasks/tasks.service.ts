import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    return found;
  }
  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
