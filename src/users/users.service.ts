import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { Model } from 'mongoose';
import { CustomI18n } from 'src/util/i18nMiddleware';
import { I18nContext } from 'nestjs-i18n';

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
    const users = await this.userModel.find()
    // const localizedUsers = this.userModel.schema.methods.toJSONLocalized(
    //   users,
    //   'en'
    // );
    // add new localized property to object of localized property like address
    // "address": {
    //         "en": "Hebron",
    //         "ar": "الخليل",
    //         "localized": "Hebron"
    //     },

    const localizedUsers = this.userModel.schema.methods.toObjectLocalizedOnly(
      users,
      I18nContext.current().lang // return current language
    );
    // return the localized data only like this
    // "address": "Hebron"

    return localizedUsers
  }

  async findOne(id: string): Promise<User> {
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException(this.i18n.translate("events.NOT_FOUND", { args: { id } }), 404)
    }
    const localizedUser = this.userModel.schema.methods.toObjectLocalizedOnly(
      findUser,
      I18nContext.current().lang
    )
    return localizedUser
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException(this.i18n.translate("events.NOT_FOUND", { args: { id } }), 404)
    }
    const updateUser = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto
    })
    const user = await this.userModel.findById(id);
    const localizedUser = this.userModel.schema.methods.toObjectLocalizedOnly(
      user,
      I18nContext.current().lang
    )
    return localizedUser
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
