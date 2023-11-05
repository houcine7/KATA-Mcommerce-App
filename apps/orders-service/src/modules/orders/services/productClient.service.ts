import { Injectable } from '@nestjs/common';
import { fetcher } from '../utils/orders.utils';
import { PRODUCT_SERVICE_URL } from '../../../config/app.config';

type ResponseSVC = {
  validQuantity: boolean;
  quantityAvailable?: number;
  message: string;
};

@Injectable()
export class ProductClientService {
  async checkQuantity(
    productId: string,
    quantity: number,
  ): Promise<ResponseSVC> {
    try {
      const { data, status } = await fetcher(
        `${PRODUCT_SERVICE_URL}/${productId}`,
      );
      if (status != 200) {
        return {
          validQuantity: false,
          message: 'Error in product service',
        };
      } else {
        if (data?.quantity && data.quantity >= quantity) {
          return {
            validQuantity: true,
            quantityAvailable: data.quantity,
            message: 'Quantity available',
          };
        } else {
          return {
            validQuantity: false,
            quantityAvailable: data.quantity,
            message: 'Quantity not available',
          };
        }
      }
    } catch (error) {
      console.log('Error in product service ------');
      console.log(error);
      return {
        validQuantity: false,
        message: 'Error in product service',
      };
    }
  }
}
