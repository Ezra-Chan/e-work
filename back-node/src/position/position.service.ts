import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';
import { PositionMessage } from './constant';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position) private positionRepository: Repository<Position>
  ) {}

  /**
   * 创建角色
   * @param createPositionDto 职位信息
   */
  async create(createPositionDto: CreatePositionDto) {
    await this.checkUnique(createPositionDto.name);
    return await this.positionRepository.save(createPositionDto);
  }

  async findAll() {
    return await this.positionRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const role = await this.positionRepository.findOne({ where: { id } });
    if (!role)
      throw new HttpException(
        PositionMessage.NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
    return role;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const pos = await this.findOne(id);
    await this.checkUnique(updatePositionDto.name);
    return await this.positionRepository.save({
      ...pos,
      ...updatePositionDto,
    });
  }

  async remove(id: number) {
    const { affected } = await this.positionRepository.delete({ id });
    if (affected === 0)
      throw new HttpException(
        PositionMessage.NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
  }

  /**
   * 检查名称唯一性
   * @param name 名称
   */
  async checkUnique(name: string) {
    if (!name) {
      throw new HttpException(
        PositionMessage.NOT_ALLOWED_EMPTY,
        HttpStatus.BAD_REQUEST
      );
    }
    const role = await this.positionRepository.findOne({ where: { name } });
    if (role) {
      throw new HttpException(
        `"${role.name}"${PositionMessage.ALREADY_EXISTS}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
