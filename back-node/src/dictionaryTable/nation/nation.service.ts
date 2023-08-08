import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nation } from './entities/nation.entity';

@Injectable()
export class NationService {
  constructor(
    @InjectRepository(Nation) private nationRepository: Repository<Nation>
  ) {}

  /**
   * 获取所有民族
   * @returns 所有民族
   */
  async findAll() {
    return await this.nationRepository.find({ order: { id: 'ASC' } });
  }
}
