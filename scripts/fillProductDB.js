const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return products;
};

const main = async () => {
  const products = await fetchProducts();
  //   console.log(products);

  // a random number between 5 and 55
  const randomQuantity = Math.floor(Math.random() * 50) + 5;

  for (let i = 0; i < products.length; i++) {
    const ProductItem = {
      ...products[i],
      quantity: randomQuantity,
    };
    const { body, status } = await fetch('http://localhost:3007/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ProductItem),
    });
    if (status < 400) {
      console.log('Product added successfully✅✌');
      console.log(body, status);
    } else {
      console.log('Product not added ❌ ');
    }
  }
};

main();
