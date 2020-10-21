const db = require('../data/db-config');

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first()
}

function findSteps(id) {
  return db('steps as s')
    .join('schemes as c', 'c.id', 's.scheme_id')
    .where(' c.id', id)
    .select('c.id', 'c.scheme_name', 's.step_number', 's.instructions')
    .orderBy('s.step_number');
}

function add(schemeData) {
  return db('schemes').insert(schemeData).then((ids) => {
    return findById(ids[0]);
  });
}

function addStep(stepData, id) {
  return db('steps', 'schemes').insert(stepData).then(() => {
    return findById(id);
  });
}

function update(changes, id) {
  return db('schemes').where({ id }).update(changes).then(() => {
    return findById(id);
  });
}

function remove(id) {
  return db('schemes').where({ id }).del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
};
