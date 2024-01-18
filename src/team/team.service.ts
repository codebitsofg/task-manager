import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class TeamService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTeamDto: Prisma.TeamCreateInput) {
    return this.databaseService.team.create({ data: createTeamDto })
  }

  findOne(id: number) {
    return this.databaseService.team.findUnique({
      where: { id: id },
      include: { members: { include: { employee: true } }, projects: true }
    })
  }

  findAll() {
    return this.databaseService.team.findMany({
      include: { members: { include: { employee: true } }, projects: true }
    })
  }

  addEmployee(id: number, memberId: number) {
    return this.databaseService.team.update({
      where: { id },
      data: {
        members: {
          create: { employee: { connect: { id: memberId } } }
        }
      }
    })
  }

  addProject(id: number, projectId: number) {
    return this.databaseService.team.update({
      where: { id },
      data: {
        projects: { connect: { id: projectId } }
      }
    })
  }

  removeEmployee(teamId: number, employeeId: number) {
    return this.databaseService.team.update({
      where: { id: teamId },
      data: { members: { deleteMany: [{ employeeId: employeeId }] } }
    })
  }

  removeProject(teamId: number, projectId: number) {
    return this.databaseService.team.update({
      where: { id: teamId },
      data: { projects: { deleteMany: [{ id: projectId }] } }
    })
  }

  removeTeam(id: number) {
    return this.databaseService.team.delete({ where: { id: id } })
  }
}
