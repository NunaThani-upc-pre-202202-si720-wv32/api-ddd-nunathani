import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PsychologistRegistered } from '../../../../account/domain/events/psychologist-registered.event';

@EventsHandler(PsychologistRegistered)
export class PsychologistRegisteredHandler implements IEventHandler<PsychologistRegistered> {
  constructor() {}

  async handle(event: PsychologistRegistered) {
    console.log(event);
  }
}