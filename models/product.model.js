const {path, readFile, writeFile} = require('../utils/CRUDL')

const dbPath = path.join(require.main.path, 'db', 'products.json')
const getFileContent = readFile

module.exports = class Product {
  
  constructor(title, imageUrl, description, price){
    this.title = title;
    this.description = description
    this.imageUrl = imageUrl
    this.price = parseFloat(price)
  }
  
  async save(){
    this.id = (Math.random()*Math.random()).toString().split('.')[1]
    let products = [];
    try {
      const content = await getFileContent(dbPath)
      products = JSON.parse(content)
    } catch (error) {
      console.log(error)
    }
    products.push(this)
    writeFile(dbPath, JSON.stringify(products),(err)=> console.log(err))
  }

  static async fetchById(id){
    try {
      const content = await getFileContent(dbPath)
      const products = JSON.parse(content)
      return products.find((product)=> product.id === id)
    } catch (error) {
      console.log(error)
    }
  }

  static async fetchAll (){
    try {
      const content = await getFileContent(dbPath)
      return JSON.parse(content)
    } catch (error) {
      return []
    }
  }
}



/**
 * Alternatively we can use callback functions to get the products asynchronously
 */
// const getFileContent = (callback) => {
//   fs.readFile(dbPath,(err, fileContent)=>{
//     if(err || !fileContent.length) {
//       return callback([])
//     }
//     return callback(JSON.parse(fileContent))
// })}


// module.exports = class Product {
//   constructor(reqBody){
//     this.title = reqBody.title
//   }
  
//   save(){
//     getFileContent((products)=>{
//       products.push(this)
//       fs.writeFile(dbPath, JSON.stringify(products),(err)=> console.log(err))
//     })
//   }

//   static fetchAll (callback){
//     return getFileContent(callback)
//   }  
// }
