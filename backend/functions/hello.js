'use strict';

module.exports.handle = async event => {
  const data = event.Item
  console.log(JSON.parse(data.user_ratings.S))

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
