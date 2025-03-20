import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { FindManyOrdersQueryDto, PaginatedOrdersResponseDto } from "./dtos";
import { OrdersService } from "./orders.service";

@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @ApiOkResponse({
    type: PaginatedOrdersResponseDto,
    description: "Successfully retrieved orders.",
  })
  async findMany(@Query() params: FindManyOrdersQueryDto) {
    const [data, total] = await this.service.findAllWithinDateRange(params);
    const lastPage = Math.floor(total / params.limit) + 1;
    const paginationMeta = {
      count: data.length,
      page: params.page,
      pageSize: params.limit,
      prevPage: params.page > 1 ? Math.min(params.page - 1, lastPage) : undefined,
      nextPage: params.page < lastPage ? params.page + 1 : undefined,
      lastPage,
    };

    return { data, meta: paginationMeta };
  }
}
