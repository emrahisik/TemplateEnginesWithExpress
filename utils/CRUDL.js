exports.path = require("path");

const { readFile, writeFile } = require("fs");
const promisify = require("util").promisify;

exports.writeFile = promisify(writeFile);
exports.readFile = promisify(readFile);
