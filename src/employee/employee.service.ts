import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto })
  }

  async findUserId(mailAdress: string) {
    const user = await this.databaseService.employee.findUnique({
      where: { email: mailAdress }
    })
    return user.id
  }

  assignTask(id: number, taskId: number) {
    return this.databaseService.employee.update({
      where: { id },
      data: { tasks: { connect: { id: taskId } } }
    })
  }

  findAllWithMails() {
    return this.databaseService.employee.findMany({ include: { teams: true } })
  }

  findAll() {
    return this.databaseService.employee.findMany({
      include: {
        tasks: true,
        projects: true,
        teams: { include: { team: true, employee: true } }
      }
    })
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
      include: {
        tasks: true,
        projects: true,
        teams: {
          include: {
            team: { include: { members: { include: { employee: true } } } }
          }
        }
      }
    })
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return `This action updates a #${id} employee`
  }

  remove(id: number) {
    return `This action removes a #${id} employee`
  }

  removeAll() {
    return this.databaseService.employee.deleteMany({})
  }
}
