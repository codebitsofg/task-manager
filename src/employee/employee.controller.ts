// @ts-nocheck
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req
} from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { Prisma } from '@prisma/client'
import { Request } from 'express'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll()
  }

  @Get('/get-all-only-mails')
  findAllWithMails() {
    return this.employeeService.findAllWithMails()
  }

  @Get('/getData')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const userId = request.session.userId
    return this.employeeService.findOne(userId)
  }

  @Patch('/update')
  update(
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
    @Req() request: Request
  ) {
    const userId = request.session.userId
    return this.employeeService.update(userId, updateEmployeeDto)
  }

  @Patch(':id/assignTask/:taskId')
  assignTask(@Param('id') id: number, @Param('taskId') taskId: number) {
    return this.employeeService.assignTask(+id, +taskId)
  }
}
