import * as fs from 'fs';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request,Response } from 'express';
import * as qrcode from 'qrcode'

@Controller('qr-code')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('/generateCode')
  async getQrCode(@Res() res:Response) {
    const qrData = `${process.env.baseUrl}/qr-code/movies`;
    const qrImage = await qrcode.toBuffer(qrData);
    res.setHeader('Content-Type', 'image/png');
    res.send(qrImage);
  }

  @Get('/movies')
  async getMovies(@Res() res:Response) {
    const movies = JSON.parse(fs.readFileSync('src/movies.json', 'utf-8'));
    return res.render('index', { movies });
  }
}
