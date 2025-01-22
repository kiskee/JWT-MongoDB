import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from '../shemas/trasactions.shema';
import * as crypto from 'crypto';

/**
 * Service responsible for handling transactions. It provides methods to
 * process and validate transactions, ensuring data integrity and security.
 */
@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name) private quizModel: Model<Transactions>, // Injects the Transactions model into the service
  ) {}

  /**
   * Secret key used for validating transaction signatures. This key is
   * loaded from environment variables.
   */
  private readonly secretKey = process.env.EVENT_KILU;

  /**
   * Processes a transaction by validating its checksum and saving it to the database.
   *
   * @param eventData - The transaction data received from an external source.
   * @param checksumHeader - The checksum received in the request header for validation.
   * @returns A promise that resolves to the saved transaction document.
   * @throws BadRequestException if the provided checksum does not match the expected value.
   */
  async processTrasaction(eventData: any, checksumHeader: any) {
    console.log(eventData);
    const signatureChecksum = eventData.signature.checksum;

    // Validate if the provided checksum matches the signature checksum
    if (checksumHeader != signatureChecksum) {
      throw new BadRequestException(`Checksum validation failed.`);
    }

    // Generate the validation string based on specified properties
    const properties = eventData.signature.properties;
    let validateString: string = '';
    properties.map((prop: any) => {
      const propParts = prop.split('.'); // Handles nested properties
      let value = eventData.data;
      for (const part of propParts) {
        value = value[part];
      }
      validateString += `${value}`; // Append the property value to the validation string
    });

    // Append the timestamp to the validation string
    validateString += `${eventData.timestamp}`;

    // Append the secret key to the validation string
    validateString += `${this.secretKey}`;

    // Generate the calculated checksum using SHA-256
    const calculatedChecksum = crypto
      .createHash('sha256')
      .update(validateString)
      .digest('hex');

    // Add calculated checksum and received checksum to the event data for debugging
    eventData['ownToken'] = calculatedChecksum;
    eventData['headerToken'] = checksumHeader;
    eventData['reference'] = eventData.data.transaction.id ?? '';

    // Validate the checksum and mark the payment as valid or invalid
    if (
      checksumHeader == calculatedChecksum &&
      signatureChecksum == calculatedChecksum
    ) {
      eventData['validPayment'] = true;
    } else {
      eventData['validPayment'] = false;
    }

    // Save the transaction data to the database
    const cretaedTrans = new this.quizModel(eventData);
    return cretaedTrans.save();
  }
}
