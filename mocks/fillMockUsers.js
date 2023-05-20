//import database
const Users = require ('../server/src/mvc/models/user').default
console.log(Users)
// Import data
const mockUsers = require( './users.json')
console.log(mockUsers)
// Fill DB
async function createMany (mockUsers) {
  return Users.create(mockUsers);
}
createMany(mockUsers);


