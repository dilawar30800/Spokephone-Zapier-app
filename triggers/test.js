const perform = (z, bundle) => {
  var token = '323+ ';
  var list = async (z, bundle) => {
    const customHttpOptions = {
      url: 'https://auth.spokephone.com/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        '{\n    "client_id": "5qPGYJldJSquweETTRCQPfuaJKAcMUKm",\n    "client_secret": "sgSEQ-21ygUw0mrOURhNxistL7AqBtg0hIQCgner8KwqkBVyy303dqyS3p21mkjo",\n    "audience": "https://integration.spokephone.com",\n    "grant_type": "client_credentials"\n}',
    };
    var response = await z.request(customHttpOptions).then((response) => {
      //setTimeout(10000);
      token += response;
      return results.access_token;
    });
  };

  return [{ test: bundle.authData, id: 21 }];
};

module.exports = {
  operation: { perform: perform },
  key: 'test',
  noun: 'test',
  display: {
    label: 'test',
    description: 'to test the authe token',
    hidden: true,
    important: false,
  },
};
