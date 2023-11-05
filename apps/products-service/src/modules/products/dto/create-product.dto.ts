export class CreateProductDTO {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly image?: string;
  readonly quantity: number;
}
