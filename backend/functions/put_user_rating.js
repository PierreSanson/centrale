const DynamoDB = require('aws-sdk/clients/dynamodb'); // "require" est équivalent au "import" de Python

module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();
    const movieID = data.movieID
    const userID = data.userID
    const rating = data.rating

    // On commence par récupérer les anciennes données associés au film et à l'utilisateur
    const movie_item = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'movie',
            uuid: movieID
        },
    }).promise();

    const user_item = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'user',
            uuid: userID
        },
    }).promise();


    // On doit ensuite modifier ces données pour insérer/modifier la note donné par l'utilisateur au film.
    let new_movie_ratings = movie_item.movie_ratings

    new_movie_ratings = JSON.parse(new_movie_ratings)
    new_movie_ratings.userID = rating
    new_movie_ratings = JSON.stringify(new_movie_ratings)

    movie_item.movie_ratings = new_movie_ratings


    // On finit par remplacer les anciennes données par les données avec les notes actualisées
    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: movie_item,
    }).promise();

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: user_item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(item),     
    };
}