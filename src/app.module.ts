import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './account/account.module';
import { AppointmentModule } from './appointment/appointment.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: 'mysql://root:root@localhost:3306/nunathani-ddd',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    ClientsModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
