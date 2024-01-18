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
    @Body() createProjectDto: Prisma.ProjectCreateInput,
    @Req() request: Request
  ) {
    console.log(request.session)
    return this.projectService.create(createProjectDto)
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

  // @Delete('/remove-all')
  // removeAll() {
  //   return this.projectService.removeAll()
  // }
}
