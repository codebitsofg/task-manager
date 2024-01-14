import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto })
  }

  findAll() {
    return this.databaseService.employee.findMany()
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id } })
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return `This action updates a #${id} employee`
  }

  remove(id: number) {
    return `This action removes a #${id} employee`
  }
}
