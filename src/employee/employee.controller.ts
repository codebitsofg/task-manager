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

  @Post()
  create(
    @Body() createEmployeeDto: Prisma.EmployeeCreateInput,
    @Req() request: Request
  ) {
    request.session.userMail = createEmployeeDto.email
    return this.employeeService.create(createEmployeeDto)
  }

  @Get('/getUserId')
  findUserId(@Req() request: Request) {
    if (request.session.userMail) {
      const mailAdress = request.session.userMail
      return this.employeeService.findUserId(mailAdress)
    } else {
      return 'No access'
    }
  }

  // login(
  //   @Body() createEmployeeDto: Prisma.EmployeeCreateInput,
  //   @Req() request: Request
  // ) {
  //   return this.employeeService.login()
  // }

  @Get()
  findAll() {
    return this.employeeService.findAll()
  }

  @Get('/only-mails')
  findAllWithMails() {
    return this.employeeService.findAllWithMails()
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
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
    return this.employeeService.remove()
  }
  @Delete('/remove-all')
  remove() {
    return this.employeeService.removeAll()
  }
}
