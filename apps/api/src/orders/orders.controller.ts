import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { FindManyOrdersQueryDto, ReadOrderDto } from "./dtos";
import { OrdersService } from "./orders.service";

@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @ApiOkResponse({
    type: ReadOrderDto,
    description: "Successfully retrieved orders.",
  })
  async findMany(@Query() params: FindManyOrdersQueryDto) {
    return await this.service.findMany(params);
  }
}
