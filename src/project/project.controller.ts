import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { Prisma } from '@prisma/client'
import { Request } from 'express'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() body: { name: string; description: string },
    @Req() request: Request
  ) {
    //@ts-ignore
    const { userId, teamId } = request.session
    const data = {
      ...body,
      teamId: teamId,
      employeeId: userId
    }
    return this.projectService.create(data)
  }

  @Get()
  findAll() {
    return this.projectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: Prisma.ProjectUpdateInput
  ) {
    return this.projectService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id)
  }
}
