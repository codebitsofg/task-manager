import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() createUserDto: Prisma.EmployeeCreateInput,
    @Req() request: Request
  ) {
    const userData = await this.authService.signup(createUserDto)

    // @ts-ignore-
    request.session.userId = userData.userId
    // @ts-ignore-
    request.session.teamId = userData.teamId
  }

  @Post('/signin')
  async login(
    @Body() loginData: Partial<Prisma.EmployeeCreateInput>,
    @Req() request: Request
  ) {
    const userData = await this.authService.signin(loginData)

    if (userData) {
      //  @ts-ignore-
      request.session.userId = userData.userId
      // @ts-ignore-
      request.session.teamId = userData.teamId
      return { teamId: userData.teamId, userId: userData.userId }
    }

    throw new UnauthorizedException('Invalid credentials')
  }

  @Post('/logout')
  async logout(@Req() request: Request, @Res() res: Response) {
    request.session.destroy(() => {
      res
        .clearCookie('connect.sid', { domain: 'taskermanager.online' })
        .send(200)
    })
  }
}
