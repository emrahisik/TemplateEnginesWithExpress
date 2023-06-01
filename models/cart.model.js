const { path, writeFile, readFile } = require("../utils/CRUDL");

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
      const foundItemIndex = cartContent.findIndex(item => item.id == product.id)
      if(foundItemIndex>0){
        cartContent[foundItemIndex].quantity+=product.quantity
      }else{
        cartContent.push(product);
      }
      await writeFile(cartDbPath, JSON.stringify(cartContent));
    } catch (error) {
      console.log(error);
    }
  }

  static async removeFromCart(product) {
    try {
      const cartContent = await getCartContent();
      const foundItemIndex = cartContent.findIndex(item => item.id == product.id)
      if(foundItemIndex){
        cartContent[foundItemIndex].quantity>1 ? cartContent[foundItemIndex].quantity -=product.quantity : cartContent.splice(foundItemIndex,1)
      }
      await writeFile(cartDbPath, JSON.stringify(cartContent));
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchCart() {
    return await getCartContent();
  }
};
