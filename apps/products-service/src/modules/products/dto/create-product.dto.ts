export class CreateProductDTO {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly image?: string;
  readonly quantity: number;
  readonly rating: {
    rate: number;
    count: number;
  };
}

/*
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
"category": "men's clothing",
"qunatity": 1,
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
"rating": {
"rate": 3.9,
"count": 120
}

*/
