import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task-repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<any> {
    const task = await this.taskRepository.createTask(createTaskDto);
    return {
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      },
      message: 'Task created successfully',
    };
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    return found;
  }

  async deleteTaskById(id: number): Promise<any> {
    const task = await this.taskRepository.delete(id);
    if (task.affected === 0) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    return { message: 'Task deleted successfully' };
  }

  async updateTaskStatusById(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
