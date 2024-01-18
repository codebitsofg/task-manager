import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { Prisma } from '@prisma/client'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto)
  }

  @Get()
  findAll() {
    return this.employeeService.findAll()
  }

  @Get('/only-mails')
  findAllWithMails() {
    return this.employeeService.findAllWithMails()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput
  ) {
    return this.employeeService.update(Number(id), updateEmployeeDto)
  }

  @Patch(':id/assignTask/:taskId')
  assignTask(@Param('id') id: number, @Param('taskId') taskId: number) {
    return this.employeeService.assignTask(+id, +taskId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id)
  }
}
