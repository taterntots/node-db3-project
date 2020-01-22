const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}

function find() {
  return db('schemes');
  // db.select('*').from('schemes') // does the same thing
}

function findById(schemeId) {
  return db('schemes')
    .where({ id: schemeId})
    .first();
}

function findSteps(schemeId) {
  return db('schemes')
    .where({ id: schemeId})
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(([id]) => {
      return findById(id);
    })
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}