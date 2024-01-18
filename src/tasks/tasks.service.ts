import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({ data: createTaskDto })
  }

  findAll() {
    return this.databaseService.task.findMany()
  }

  findOne(id: number) {
    return this.databaseService.task.findUnique({ where: { id } })
  }

  update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: { id },
      data: updateTaskDto
    })
  }

  remove(id: number) {
    return this.databaseService.task.delete({ where: { id } })
  }

  removeAll(id: number) {
    return this.databaseService.task.deleteMany()
  }
}
