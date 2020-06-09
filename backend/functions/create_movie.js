const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb'); // "require" est équivalent au "import" de Python

module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'movie',
        uuid: data.Name_Year,
        genre: data.genre,
        ratings: null,
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    }
}

