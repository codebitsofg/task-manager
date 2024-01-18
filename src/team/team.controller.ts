import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { TeamService } from './team.service'
import { Prisma } from '@prisma/client'

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: Prisma.TeamCreateInput) {
    return this.teamService.create(createTeamDto)
  }

  @Get()
  findAll() {
    return this.teamService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id)
  }

  @Patch('/:teamId/employee/:employeeId')
  async addEmployeeToTeam(
    @Param('teamId') teamId: number,
    @Param('employeeId') employeeId: number
  ) {
    return this.teamService.addEmployee(+teamId, +employeeId)
  }

  @Patch(':id/projects/:projectId')
  addProject(@Param('id') id: number, @Param('projectId') projectId: number) {
    return this.teamService.addProject(+id, +projectId)
  }

  @Delete(':teamId/employee/:employeeId')
  async removeEmployee(
    @Param('teamId') teamId: number,
    @Param('employeeId') employeeId: number
  ) {
    return this.teamService.removeEmployee(+teamId, +employeeId)
  }

  @Delete(':teamId/projects/:projectId')
  removeProject(
    @Param('teamId') teamId: number,
    @Param('projectId') projectId: number
  ) {
    return this.teamService.removeProject(+teamId, +projectId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.removeTeam(+id)
  }
}
