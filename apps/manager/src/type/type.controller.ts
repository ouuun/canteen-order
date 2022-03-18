import { Controller, Get } from '@nestjs/common';
import { Public } from '@utils/utils/auth/public.metadata';
import { TypeService } from '@model/model/type/type/type.service';
import { Type } from '@model/model/type/type/type.model';

@Controller('api/manager/type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {
    //
  }

  // @Post('create')
  // async create(@Body() body: any, @Req() request: Request): Promise<any> {
  //   const user: any = request.user;
  //   // return await this.cardService.createCard(Object.assign({}, body, { operId: user.id }));
  // }
  @Get('search')
  @Public()
  async search(): Promise<Type[]> {
    return await this.typeService.getAll();
  }
}
