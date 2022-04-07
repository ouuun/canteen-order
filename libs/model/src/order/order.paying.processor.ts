import { Process, Processor } from '@nestjs/bull';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { OrderService } from '@model/model/order/order/order.service';
import { exceptionMessage } from '@utils/utils/filter/exception-message';
import { Job } from 'bull';

@Processor('order:paying')
export class OrderPayingProcessor {
  constructor(
    private readonly logger: LoggerTsService,
    private readonly orderService: OrderService,
  ) {
    //
  }

  @Process()
  async checkPaying(job: Job<{ id: number }>) {
    try {
      const OrderId = job.data.id;
      if (await this.orderService.cancelOrder(OrderId))
        this.logger.debug(`auto cancelled unpaid order ${OrderId}`, 'bull');
      await job.progress(100);
    } catch (e) {
      this.logger.error(
        exceptionMessage(e),
        e instanceof Error ? (e as Error).stack : null,
        'OrderPayingProcessor',
      );
    }
  }
}
