import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function scan(params) {
  return dynamoDb
    .scan(params)
    .promise()
    .then(data => data.Items);
}

export function get(params) {
  console.log('DEBUG: begin db.get');
  return dynamoDb
    .get(params)
    .promise()
    .then(data => data.Item);
}

export function createItem(params) {
  console.log('DEBUG: begin db.createItem');
  return dynamoDb
    .put(params)
    .promise()
    .then(() => params.Item);
}

export function updateItem(params, args) {
  console.log('DEBUG: begin db.updateItem');
  return dynamoDb
    .update(params)
    .promise()
    .then(() => args);
}

export function deleteItem(params, args) {
  console.log('DEBUG: begin db.deleteItem');
  return dynamoDb
    .delete(params)
    .promise()
    .then(() => args);
}
