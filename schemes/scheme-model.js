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

// function findById(schemeId) {
//   return db('schemes')
//     .where({ id: schemeId})
//     .then(scheme => {
//       if (scheme) {
//         return scheme[0];
//       } else {
//         return null;
//       }
//     })
// }

function findSteps(schemeId) {
  return db('steps as st')
    .join('schemes as s', 'st.scheme_id', 's.id')
    .select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .where('st.scheme_id', schemeId)
    .orderBy('st.step_number')
}

function add(newScheme) {
  return db('schemes')
    .insert(newScheme)
    .then(([id]) => {
      return findById(id);
    })
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(scheme => {
      return findById(id);
    })
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}