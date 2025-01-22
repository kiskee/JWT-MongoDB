import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from '../shemas/trasactions.shema';
import * as crypto from 'crypto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name) private quizModel: Model<Transactions>,
  ) {}

  private readonly secretKey = process.env.EVENT_KILU;

  async processTrasaction(eventData: any, checksumHeader: any) {
    const signatureChecksum = eventData.signature.checksum;
    if (checksumHeader != signatureChecksum) {
      throw new BadRequestException(`error`);
    }
    // generamos nuestro propio sha
    const properties = eventData.signature.properties;
    let validateString: string = '';
    properties.map((prop: any) => {
      const propParts = prop.split('.');
      let value = eventData.data;
      for (const part of propParts) {
        value = value[part];
      }
      validateString += `${value}`;
    });

    // añadimos el timestamp
    validateString += `${eventData.timestamp}`;

    //añadimos el secreto
    validateString += `${this.secretKey}`;

    const calculatedChecksum = crypto
      .createHash('sha256')
      .update(validateString)
      .digest('hex')
      .toUpperCase();

    const cretaedTrans = new this.quizModel({
      eventData,
      ownToken: calculatedChecksum,
    });
    return cretaedTrans.save();
  }
}
