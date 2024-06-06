import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { validationType } from './admins.controller';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}


  async validateAdmin(adminDto: CreateAdminDto): Promise<validationType> {
    
    const {username, password} = adminDto;

    console.log(`Välitetty admin: username=${username} ja password=${password} `);
    
    const adminUser =  this.adminsRepository.findOneBy({ username, password });


    if (adminUser){
      const token = '12345eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; 

      return {      
        isValid: true,
        message: 'Admin user validation success!',
        token: token
      };
    }

    return {      
      isValid: false,
      message: 'Admin user was not found!',
      token: null
    };
  }

  create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminsRepository.create(createAdminDto);
    return this.adminsRepository.save(admin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: number): Promise<Admin> {
    return this.adminsRepository.findOneBy({ id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminsRepository.update(id, updateAdminDto);
    return this.adminsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }
}
