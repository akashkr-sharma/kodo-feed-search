import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    getHello(): string {
        return "Hello World";
    }
}
