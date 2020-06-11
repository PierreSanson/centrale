//const uuid = require('uuid'); (je m'en sers pas)
const DynamoDB = require('aws-sdk/clients/dynamodb'); // "require" est équivalent au "import" de Python

module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'movie',
        uuid: data.uuid,
        genre: data.genre,
        movie_ratings: null,
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(item),     
    };
}

