const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'movie',
            uuid: "Un super film (1999)", //event.pathParameters.id
        },
    }).promise();

    if (result.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        }
    } else {
        return {
            statusCode: 404,
            body: 'Not found'
        }
    }
}

