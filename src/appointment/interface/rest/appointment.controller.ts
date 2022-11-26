import { Controller, Post, Body, Res, Get, Delete, Param } from '@nestjs/common';
import { Result }                           from 'typescript-result';
import { QueryBus }                         from '@nestjs/cqrs';
import { AppointmentApplicationService }   from 'src/appointment/application/services/appointment-application.service';
import { AppNotification }                  from 'src/shared/application/app.notification';
import { ApiController }                    from 'src/shared/interface/rest/api.controller';
import { RegisterAppointmentRequest }      from 'src/appointment/application/dto/request/register-appointment-request.dto';
import { RegisterAppointmentResponse }     from 'src/appointment/application/dto/response/register-appointment-response.dto';
import { GetAppointment }           from 'src/appointment/application/messages/queries/get-appointment.query';
import { ApiOperation, ApiTags }            from '@nestjs/swagger';

@Controller('appointment')
@ApiTags('appointment date')
export class AppointmentController {
  constructor(
    private readonly appointmentApplicationService: AppointmentApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register Appointment' })
  async register(
    @Body() registerAppointmentRequest: RegisterAppointmentRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAppointmentResponse> = await this.appointmentApplicationService.register(registerAppointmentRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get All Appointment' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetAppointment());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Appointment By Id' })
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointment = await this.appointmentApplicationService.getById(id);
      return ApiController.ok(response, appointment);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/topic/:topic')
  @ApiOperation({ summary: 'Get Appointment By Topic' })
  async getByUsername(@Param('topic') topic: string, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointment = await this.appointmentApplicationService.getByTopic(topic);
      return ApiController.ok(response, appointment);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete appointment By Id' })
  async deleteById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointment = await this.appointmentApplicationService.delete(id);

      const created: any = {
        deleted: appointment
      }

      return ApiController.ok(response, created);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}