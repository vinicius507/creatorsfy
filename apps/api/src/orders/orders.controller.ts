import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";
import { FindManyOrdersQueryDto, ReadOrderDto } from "./dtos";
import { OrdersService } from "./orders.service";

@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @ApiOkResponse({
    isArray: true,
    type: ReadOrderDto,
    description: "Successfully retrieved orders.",
  })
  async findMany(@Res({ passthrough: true }) res: FastifyReply, @Query() params: FindManyOrdersQueryDto) {
    const [orders, total] = await this.service.findMany(params);
    const lastPage = Math.floor(total / params.limit) + 1;
    const nextPage = params.page < lastPage ? params.page + 1 : undefined;
    const prevPage = params.page > 1 ? Math.min(params.page - 1, lastPage) : undefined;

    res.headers({
      "x-count": orders.length.toString(),
      "x-page": params.page.toString(),
      "x-page-size": params.limit.toString(),
      "x-last-page": lastPage.toString(),
      "x-next-page": nextPage?.toString(),
      "x-prev-page": prevPage?.toString(),
    });
    return orders;
  }
}
