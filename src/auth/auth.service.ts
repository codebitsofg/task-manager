import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signup(createUserDto: Prisma.EmployeeCreateInput) {
    const user = await this.databaseService.employee.create({
      data: {
        ...createUserDto,
        teams: { create: { team: { create: { name: 'My Team' } } } }
      },

      include: { teams: { include: { team: true } } }
    })

    return { userId: user.id, teamId: user.teams[0].teamId }
  }

  async signin({ email, password }: Partial<Prisma.EmployeeCreateInput>) {
    const user = await this.databaseService.employee.findUnique({
      where: { email, password },
      include: { teams: { include: { team: true } } }
    })

    return user ? { userId: user.id, teamId: user.teams[0].teamId } : false
  }
}
