const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    userID = event.body
  
    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'user',
            uuid: userID
        },
    }).promise();

    if (result.Item) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(result.Item.suggestions),
        }
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
            body: 'Not found',
        };
    }
}