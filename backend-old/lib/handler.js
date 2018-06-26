// import postType from './jctest.graphql';
import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import postResolver from './data/resolvers/post';
import postType from './jctest.graphql';

const typeDefs = postType;
const resolvers = postResolver;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
    });
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};

exports.record = (event, context, callback) => {
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
