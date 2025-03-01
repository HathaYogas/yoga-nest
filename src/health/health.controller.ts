import { Controller, Get } from '@nestjs/common';
import { hostname } from 'os';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return {
      status: 'ok',
      time: new Date().toISOString(),
      message: 'yoga-nest에 온 걸 환영해!',
      server: hostname(),
      uptime: process.uptime().toFixed(0) + '초',
      env: process.env.NODE_ENV || 'development',
    };
  }
}
