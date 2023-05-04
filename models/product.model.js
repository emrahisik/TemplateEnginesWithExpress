const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

const dbPath = path.join(require.main.path, 'db', 'products.json')
const getFileContent = promisify(fs.readFile)

module.exports = class Product {
  
  constructor(reqBody){
    this.title = reqBody.title
  }
  
  async save(){
    let products = [];
    try {
      const content = await getFileContent(dbPath)
      products = JSON.parse(content)
    } catch (error) {
      console.log(error)
    }
    products.push(this)
    fs.writeFile(dbPath, JSON.stringify(products),(err)=> console.log(err))
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
