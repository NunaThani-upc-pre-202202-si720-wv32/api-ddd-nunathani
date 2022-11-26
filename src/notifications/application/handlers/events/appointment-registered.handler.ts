import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AppointmentRegistered } from '../../../../appointment/domain/events/appointment-registered.event';

@EventsHandler(AppointmentRegistered)
export class AppointmentRegisteredHandler implements IEventHandler<AppointmentRegistered> {
  constructor() {}

  async handle(event: AppointmentRegistered) {
    console.log(event);
  }
}