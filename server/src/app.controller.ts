import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<h1>웰컴 키오스크</h1>';
  }
}
