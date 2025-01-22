import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transactions extends Document {
  @Prop()
  event: string;

  @Prop({
    type: Object,
  })
  data: {
    transaction: {
      id: string;
      created_at: string;
      finalized_at: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: string;
      payment_method_type: string;
      payment_method: [Object];
      status: string;
      status_message: any;
      shipping_address: any;
      redirect_url: string;
      payment_source_id: any;
      payment_link_id: any;
      customer_data: [Object];
      billing_data: any;
    };
  };

  @Prop()
  environment: string;

  @Prop({
    type: Object,
  })
  signature: {
    properties: string[];
    checksum: string;
  };

  @Prop()
  timestamp: number;

  @Prop()
  sent_at: string;

  @Prop()
  ownToken: string;

}

export const TransactionsShema = SchemaFactory.createForClass(Transactions);
