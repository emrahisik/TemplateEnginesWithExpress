const { path, writeFile, readFile } = require("../utils/CRUDL");
const Product = require("./product.model");

const cartDbPath = path.join(require.main.path, "db", "cart.json");

const getCartContent = async () => {
  let cartContent = [];
  const data = await readFile(cartDbPath);
  if (data.length) cartContent = JSON.parse(data);
  return cartContent;
};

module.exports = class Cart {
  static async addToCart(product) {
    try {
      const cartContent = await getCartContent();
      const foundItemIndex = cartContent.findIndex(
        (item) => item.productId === product.id
      );
      console.log(foundItemIndex);
      if (foundItemIndex >= 0) {
        cartContent[foundItemIndex].quantity += product.quantity;
      } else {
        cartContent.push(product);
      }
      await writeFile(cartDbPath, JSON.stringify(cartContent));
    } catch (error) {
      console.log(error);
    }
  }

  static async removeFromCart(productId) {
    try {
      const cartContent = await getCartContent();
      const foundItemIndex = cartContent.findIndex(
        (item) => item.productId === productId
      );
      if (foundItemIndex >= 0) {
        cartContent[foundItemIndex].quantity > 1
          ? (cartContent[foundItemIndex].quantity -= 1)
          : cartContent.splice(foundItemIndex, 1);
      }
      await writeFile(cartDbPath, JSON.stringify(cartContent));
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchCart() {
    let productsInCart = [];
    const productIdsInCart = await getCartContent();
    const products = await Product.fetchAll();
    productsInCart = productIdsInCart.map((cartItem) => {
      const productInCart = products.find(
        (product) => product.id === cartItem.productId
      );
      return { ...productInCart, quantity: cartItem.quantity };
    });
    return productsInCart;
  }
};
