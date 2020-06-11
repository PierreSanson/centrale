const DynamoDB = require('aws-sdk/clients/dynamodb');

function roundHalf(num) {
    return Math.round(num*2)/2;
}

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const movieID = event.body

    const dynamoDb = new DynamoDB.DocumentClient();
    const movie = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'movie',
            uuid: movieID
        },
    }).promise();

    console.log(movie)

    const movie_ratings = JSON.parse(movie.Item.movie_ratings)
    let compteur = 0
    let moyenne = 0

    for (const userID in movie_ratings){
        compteur = compteur + 1
        moyenne = moyenne + parseFloat(movie_ratings[userID])
    }
    
    moyenne = moyenne/compteur
    moyenne = roundHalf(moyenne)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(moyenne),        
    };
}