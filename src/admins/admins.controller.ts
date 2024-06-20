import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Response } from 'express';

export interface validationType {
  isValid: boolean;
  message: string;
  token?: string;
}

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Body() adminDto: CreateAdminDto, @Res() res: Response) {
    const result: validationType =
      await this.adminsService.validateAdmin(adminDto);

    if (result.isValid) {
      return res.status(HttpStatus.OK).json({
        message: result.message,
        token: result.token,
      });
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: result.message,
      token: null,
    });
  }

  @Post('new')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminsService.create(createAdminDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.adminsService.remove(+id);
  }
}
