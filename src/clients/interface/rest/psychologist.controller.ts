import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result }                           from 'typescript-result';
import { QueryBus }                         from '@nestjs/cqrs';
import { PsychologistApplicationService }   from 'src/clients/application/services/psychologist-application.service';
import { AppNotification }                  from 'src/shared/application/app.notification';
import { ApiController }                    from 'src/shared/interface/rest/api.controller';
import { RegisterPsychologistRequest }      from 'src/clients/application/dtos/request/register-psychologist-request.dto';
import { RegisterPsychologistResponse }     from 'src/clients/application/dtos/response/register-psychologist-response.dto';
import { GetPsychologistClients }           from 'src/clients/application/messages/queries/get-psychologist-clients.query';
import { ApiOperation, ApiTags }            from '@nestjs/swagger';

@Controller('clients/psychologist')
@ApiTags('psychologist clients')
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
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetPsychologistClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const person = await this.psychologistApplicationService.getById(id);
      return ApiController.ok(response, person);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}