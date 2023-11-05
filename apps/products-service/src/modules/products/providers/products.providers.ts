import { Connection } from 'mongoose';
import { ProductSchema } from '../model/product.schema';

export const ProductProviders = [
  {
    provide: 'Product_MODEL', // this is the name of the provider can be referenced in other modules
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema), // this is the name of the collection in the database will be created automatically by mongoose if it does not exist
    inject: ['DATABASE_CONNECTION'], // this provider depends on the DATABASE_CONNECTION provider
  },
];
