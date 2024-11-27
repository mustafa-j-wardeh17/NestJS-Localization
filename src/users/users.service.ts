import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { Model } from 'mongoose';
import { CustomI18n } from 'src/util/i18nMiddleware';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly i18n: CustomI18n,

  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.userModel.findOne({
      email: createUserDto.email
    })
    if (findUser) {
      throw new HttpException(this.i18n.translate('events.EXISTS_EMAIL'), 409)
    }
    const createUser = await this.userModel.create(createUserDto)
    return createUser
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find()
  }

  async findOne(id: string): Promise<User> {
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException(this.i18n.translate("events.NOT_FOUND", { args: { id } }), 404)
    }
    return findUser
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException(this.i18n.translate("events.NOT_FOUND", { args: { id } }), 404)
    }
    const updateUser = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto
    })
    return await this.userModel.findById(id);
  }

  async remove(id: string) {
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException(this.i18n.translate("events.NOT_FOUND", { args: { id } }), 404)
    }

    const deleteUser = await this.userModel.findByIdAndDelete(id)
    return `User With Id=${id} has been deleted successfully`
  }
}
