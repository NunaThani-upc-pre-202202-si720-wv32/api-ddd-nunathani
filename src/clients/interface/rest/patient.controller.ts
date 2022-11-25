import { Controller, Post, Body, Res, Get, Param, Delete } from '@nestjs/common';
import { Result }                   from 'typescript-result';
import { QueryBus }                 from '@nestjs/cqrs';
import { RegisterPatientRequest }    from 'src/clients/application/dtos/request/register-patient-request.dto';
import { PatientApplicationService } from 'src/clients/application/services/patient-application.service';
import { AppNotification }          from 'src/shared/application/app.notification';
import { RegisterPatientResponse }   from 'src/clients/application/dtos/response/register-patient-response.dto';
import { ApiController }            from 'src/shared/interface/rest/api.controller';
import { GetPatientClients }         from 'src/clients/application/messages/queries/get-patient-clients.query';
import { ApiOperation, ApiTags }    from '@nestjs/swagger';
import { isBooleanObject } from 'util/types';

@Controller('clients/patient')
@ApiTags('patient clients')
export class PatientController {
  constructor(
    private readonly patientApplicationService: PatientApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register Patient Client' })
  async register(
    @Body() registerPatientRequest: RegisterPatientRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPatientResponse> = await this.patientApplicationService.register(registerPatientRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get All Patient Clients' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetPatientClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Patient Client By Id' })
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.patientApplicationService.getById(id);
      return ApiController.ok(response, patient);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/username/:username')
  @ApiOperation({ summary: 'Get Patient Client By Username' })
  async getByUsername(@Param('username') username: string, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.patientApplicationService.getByUsername(username);
      return ApiController.ok(response, patient);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Patient Client By Id' })
  async deleteById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.patientApplicationService.delete(id);

      const created: any = {
        ok: patient
      }

      return ApiController.ok(response, created);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}