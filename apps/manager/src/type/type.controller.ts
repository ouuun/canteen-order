import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Public } from '@utils/utils/auth/public.metadata';
import { TypeService } from '@model/model/cuisine/type/type/type.service';
import { Type } from '@model/model/cuisine/type/type/type.model';

@Controller('api/manager/type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {
    //
  }

  @Get('search')
  @Public()
  async search(): Promise<Type[]> {
    return await this.typeService.getAll();
  }

  @Get('search/withDish')
  @Public()
  async searchWithDish(): Promise<Type[]> {
    return await this.typeService.getAllWithDish();
  }

  @Post('add')
  async add(@Body() body: any, @Req() request: any): Promise<Type> {
    const user = request.user;
    return await this.typeService.addType(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Post('delete')
  async delete(@Body() body: any, @Req() request: any): Promise<Type> {
    const user = request.user;
    return await this.typeService.deleteType(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Post('update')
  async update(@Body() body: any, @Req() request: any): Promise<Type> {
    const user = request.user;
    return await this.typeService.updateType(
      Object.assign({}, body, { operId: user.id }),
    );
  }

  @Post('sort')
  async sort(@Body() body: any, @Req() request: any): Promise<Type[]> {
    const user = request.user;
    return await this.typeService.sortType(
      Object.assign({}, body, { operId: user.id }),
    );
  }
}
