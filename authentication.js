const testAuth = (z, bundle) => {
const options = {
  url: 'https://auth.spokephone.com/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body:{
 "client_id":bundle.authData.client_id,
    "client_secret": bundle.authData.client_secret,
    "audience": "https://integration.spokephone.com",
    "grant_type":"client_credentials"
  }
}

return z.request(options)
  .then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  type: 'custom',
  test: testAuth,
  fields: [
    { computed: false, key: 'client_id', required: true, label: 'Client Id' },
    {computed: false, key: 'client_secret', required: true, label: 'Client Secret',
    },
  ],
  customConfig: {},
};
