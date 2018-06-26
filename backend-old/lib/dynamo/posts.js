import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'posts';

export function getPosts() {
  console.log('DEBUG: begin dbPosts.getPosts');
  const params = {
    TableName,
    AttributesToGet: ['id', 'content', 'votes', 'createdAt'],
  };
  console.log(`dbPosts.getPosts: passing params to dynamodb: ${params}`);
  return db.scan(params);
}

export function getPostById(id) {
  console.log('DEBUG: begin dbPosts.getPostById');
  const params = {
    TableName,
    Key: {
      id,
    },
  };
  console.log('DEBUG: passing to dynamodb, dbPosts.getPostById');
  return db.get(params);
}

export function createPost(args) {
  console.log('DEBUG: begin dbPosts.createPost');
  const params = {
    TableName,
    Item: {
      id: uuid(),
      content: args.content,
      createdAt: new Date().toISOString(),
      votes: 0,
    },
  };

  console.log(
    `dbPosts.createPost initiated: id: ${params.id}, content: ${
      params.content
    }`,
  );
  return db.createItem(params).catch(e => {
    console.log(e);
  });
}

export function updatePost(args) {
  console.log('DEBUG: begin dbPosts.updatePost');
  const params = {
    TableName: 'posts',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':content': args.content,
    },
    UpdateExpression: 'SET content = :content',
    ReturnValues: 'ALL_NEW',
  };

  console.log('DEBUG: passing to dynamodb, dbPosts.updatePost');
  return db.updateItem(params, args);
}

export function deletePost(args) {
  console.log('DEBUG: begin dbPosts.deletePost');
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  console.log('DEBUG: passing to dynamodb, dbPosts.deletePost');
  return db.deleteItem(params, args);
}

export function incrementVoteForPost(args) {
  console.log('DEBUG: begin dbPosts.incrementVoteForPost');
  const params = {
    TableName,
    Key: { id: args.id },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'ADD votes :incr',
    ExpressionAttributeValues: { ':incr': 1 },
    ReturnValues: 'ALL_NEW',
  };

  console.log('DEBUG: passing to dynamodb, dbPosts.incrementVoteForPost');
  return db.updateItem(params, args);
}
