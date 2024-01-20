import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { EmployeeModule } from './employee/employee.module'
import { TasksModule } from './tasks/tasks.module'
import { TeamModule } from './team/team.module'
import { ProjectModule } from './project/project.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    TasksModule,
    TeamModule,
    ProjectModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
