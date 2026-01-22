import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateReservationsDTO } from './DTOs/create.reservations.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor (private readonly service: ReservationsService) {}

    @Get()
    listReservations(@Query('pending') pending: boolean) {
        return this.service.listReservations(pending);
    }

    @Post()
    createReservation(@Body() reservationDto: CreateReservationsDTO) {
        return this.service.createReservation(reservationDto);
    }

    @Patch(':title')
    modifyReservationStatus(@Param('title') title: string) {
        return this.service.patchReservationStatus(title);
    }
}
