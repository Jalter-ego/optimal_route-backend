import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { CreateOrderWithLocationDto, UpdateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.findOne(id);
    }

    @ApiBody({ type: () => CreateOrderWithLocationDto })
    @Post()
    async create(@Body() dto: CreateOrderWithLocationDto) {
        return this.orderService.create(dto);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOrderDto) {
        return this.orderService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.delete(id);
    }
}
