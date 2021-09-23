import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class DbService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  users = [
    {
      name: 'Илья',
      secondName: 'Злобин',
      email: 'qwertin1998@gmail.com',
      password: 'qwertin1998',
    },
    {
      name: 'Наталья',
      secondName: 'Хиковна',
      email: 'natali1970@mail.ru',
      password: 'natali1970@mail.ru',
    },
    {
      name: 'Ирина',
      secondName: 'Филина',
      email: 'irina1590@gmail.com',
      password: 'irina1590@gmail.com',
    },
    {
      name: 'Эльдар',
      secondName: 'Юсупов',
      email: 'usupov2001@gmail.com',
      password: 'usupov2001@gmail.com',
    },
  ];
  posts = [
    {
      img: '335ea57c-2baf-4d87-805a-f65ec2926d42.jpg',
      icon: 'fa-gamepad',
      title:
        'Презентация Dead Space, украденный ради PUBG миллион и другие новости недели',
      html:
        '<p class="m-5">Ubisoft представила обзорный трейлер Far Cry 6, в которой напомнила сюжетную завязку и рассказала об особенностях проекта. \n' +
        'В игре, напомним, главный герой (или героиня) Дани Рохас стремится свергнуть диктатора Антона Кастильо (Джанкарло Эспозито), который хочет превратить местную Яру в рай — но насильственными способами. Поэтому центральному персонажу придётся принять участие в революции. </p>',
      category: 'Игры',
    },
    {
      img: 'dd256b0d-da54-4f1c-94e3-2c2d23ab1ace.jpg',
      icon: 'fa-gamepad',
      title:
        'PS4-версия Disco Elysium: The Final Cut выйдет на физических носителях 9 ноября',
      html:
        '<p class="m-5">Ubisoft представила обзорный трейлер Far Cry 6, в которой напомнила сюжетную завязку и рассказала об особенностях проекта. \n' +
        'В игре, напомним, главный герой (или героиня) Дани Рохас стремится свергнуть диктатора Антона Кастильо (Джанкарло Эспозито), который хочет превратить местную Яру в рай — но насильственными способами. Поэтому центральному персонажу придётся принять участие в революции. </p>',
      category: 'Игры',
    },
    {
      img: 'd4707dd2-1956-419d-9dc8-3812afb0e069.jpg',
      icon: 'fa-gamepad',
      title:
        'Авторы Dying Light 2 рассказали о паркуре, оружии и крафте — эксклюзив «Игромании»',
      html:
        '<p class="m-5">Ubisoft представила обзорный трейлер Far Cry 6, в которой напомнила сюжетную завязку и рассказала об особенностях проекта. \n' +
        'В игре, напомним, главный герой (или героиня) Дани Рохас стремится свергнуть диктатора Антона Кастильо (Джанкарло Эспозито), который хочет превратить местную Яру в рай — но насильственными способами. Поэтому центральному персонажу придётся принять участие в революции. </p>',
      category: 'Игры',
    },
  ];
  async dropUsers(): Promise<string> {
    await this.connection.collection('users').drop();
    return 'Пользователи удалены';
  }
}
