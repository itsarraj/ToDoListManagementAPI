import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({ _id: id });
  }

  async markDone(id: string): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { done: true }, { new: true });
  }
}
