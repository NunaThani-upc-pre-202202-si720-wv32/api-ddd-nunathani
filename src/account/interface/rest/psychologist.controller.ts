import { Controller, Post, Body, Res, Get, Delete, Param } from '@nestjs/common';
import { Result }                           from 'typescript-result';
import { QueryBus }                         from '@nestjs/cqrs';
import { PsychologistApplicationService }   from 'src/account/application/services/psychologist-application.service';
import { AppNotification }                  from 'src/shared/application/app.notification';
import { ApiController }                    from 'src/shared/interface/rest/api.controller';
import { RegisterPsychologistRequest }      from 'src/account/application/dtos/request/register-psychologist-request.dto';
import { RegisterPsychologistResponse }     from 'src/account/application/dtos/response/register-psychologist-response.dto';
import { GetPsychologistClients }           from 'src/account/application/messages/queries/get-psychologist-account.query';
import { ApiOperation, ApiTags }            from '@nestjs/swagger';

@Controller('account/psychologist')
@ApiTags('psychologist account')
export class PsychologistController {
  constructor(
    private readonly psychologistApplicationService: PsychologistApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register Psychologist Client' })
  async register(
    @Body() registerPsychologistRequest: RegisterPsychologistRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPsychologistResponse> = await this.psychologistApplicationService.register(registerPsychologistRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get All Psychologist Clients' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetPsychologistClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Psychologist Client By Id' })
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.psychologistApplicationService.getById(id);
      return ApiController.ok(response, patient);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/username/:username')
  @ApiOperation({ summary: 'Get Patient Client By Username' })
  async getByUsername(@Param('username') username: string, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.psychologistApplicationService.getByUsername(username);
      return ApiController.ok(response, patient);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Patient Client By Id' })
  async deleteById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const patient = await this.psychologistApplicationService.delete(id);

      const created: any = {
        deleted: patient
      }

      return ApiController.ok(response, created);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}