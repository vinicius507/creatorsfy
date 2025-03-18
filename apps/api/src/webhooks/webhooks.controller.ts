import { OrdersService } from "@/orders/orders.service";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";
import { NewOrderDto } from "./dtos";

@Controller("webhook")
export class WebhooksController {
  constructor(private readonly orders: OrdersService) {}

  @Post("order")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: "Successfully registered a new order via the webhook",
  })
  async newOrderWebhook(@Body() data: NewOrderDto) {
    await this.orders.registerOrder(data);
  }
}
