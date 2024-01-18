import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.databaseService.project.create({ data: createProjectDto })
  }

  findAll() {
    return this.databaseService.project.findMany()
  }

  findOne(id: number) {
    return this.databaseService.project.findUnique({ where: { id } })
  }

  update(id: number, updateProjectDto: Prisma.ProjectUpdateInput) {
    return this.databaseService.project.update({
      where: { id },
      data: updateProjectDto
    })
  }

  remove(id: number) {
    return this.databaseService.project.delete({ where: { id } })
  }
}
