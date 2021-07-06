// ***********************
// FUNCTION CODE
// ***********************
const got = require('got');
const TokenValidator = require('twilio-flex-token-validator').functionValidator;

// Validate the Flex token to secure requests to the Function
exports.handler = TokenValidator(function(context, event, callback) {
  // Create a response object that will allow for CORS
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Run a GET request against the Yelp API
  got(
    `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(
      event.location
    )}&terms=cafes`,
    {
      headers: {
        Authorization: `Bearer ${context.YELP_API_KEY}`,
      },
    }
  )
    .then(res => {
      // Update the body of the response to include the list of cafes
      response.setBody(res.body);
      callback(null, response);
    })
    .catch(err => {
      // Respond with any error scenarios
      response.setBody(err);
      callback(response);
    });
});
