const db = require('../data/db-config');

module.exports = {
  find,
  findById
}

function find() {
  return db('schemes');
  // db.select('*').from('schemes') // does the same thing
}

function findById(userId) {
  return db('schemes')
    .where({ id: userId})
    .first();
}

