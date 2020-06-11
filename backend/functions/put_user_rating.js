const DynamoDB = require('aws-sdk/clients/dynamodb'); // "require" est équivalent au "import" de Python

function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
}

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
    let old_movie_ratings = movie_item.Item.movie_ratings
    old_movie_ratings = JSON.parse(old_movie_ratings)

    let new_movie_ratings = {}
    new_movie_ratings[userID] = rating
   
    let final_movie_ratings = {};
    final_movie_ratings = jsonConcat(final_movie_ratings, old_movie_ratings);
    final_movie_ratings = jsonConcat(final_movie_ratings, new_movie_ratings);
    
    final_movie_ratings = JSON.stringify(final_movie_ratings)
    movie_item.Item.movie_ratings = final_movie_ratings


    let old_user_ratings = user_item.Item.user_ratings
    old_user_ratings = JSON.parse(old_user_ratings)

    let new_user_ratings = {}
    new_user_ratings[movieID] = rating
   
    let final_user_ratings = {};
    final_user_ratings = jsonConcat(final_user_ratings, old_user_ratings);
    final_user_ratings = jsonConcat(final_user_ratings, new_user_ratings);
    
    final_user_ratings = JSON.stringify(final_user_ratings)
    user_item.Item.user_ratings = final_user_ratings

    // On finit par remplacer les anciennes données par les données avec les notes actualisées
    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: movie_item.Item,
    }).promise();

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: user_item.Item,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify("La note a bien été insérée dans la BDD."),     
    };
}