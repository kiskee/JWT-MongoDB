import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transactions extends Document {
  @Prop({ required: true })
  event: string;

  @Prop({
    type: Object,
    required: true,
  })
  data: {
    transaction: {
      id: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: string;
      payment_method_type: string;
      redirect_url: string;
      status: string;
      shipping_address: string | null;
      payment_link_id: string | null;
      payment_source_id: string | null;
    };
  };

  @Prop({ required: true })
  environment: string;

  @Prop({
    type: Object,
    required: true,
  })
  signature: {
    properties: string[];
    checksum: string;
  };

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  sent_at: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
