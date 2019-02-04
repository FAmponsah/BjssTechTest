const axios = require('axios');

module.exports = {
  createUser: async function(url, dataString) {
    let response = await axios.get(url, {
      params: {
        'name': dataString.name,
        'age': dataString.age,
        'salary': dataString.salary
      }
    });
    if (response !== undefined) {
      return response;
    }
    throw new Error('An error occured whilst trying to create a new user via an api call.');
  }
};
