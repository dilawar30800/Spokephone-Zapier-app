const fetch = require("node-fetch");
const fetchToken=async function(z,bundle)
{
  const options = {
  url: 'https://auth.spokephone.com/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body:{
 "client_id":"5qPGYJldJSquweETTRCQPfuaJKAcMUKm",
    "client_secret": "sgSEQ-21ygUw0mrOURhNxistL7AqBtg0hIQCgner8KwqkBVyy303dqyS3p21mkjo",
    "audience": "https://integration.spokephone.com",
    "grant_type":"client_credentials"
  }
}

return await z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results;
  });
}
const getToken = async function() 
{
var apiResults= await fetch("https://auth.spokephone.com/oauth/token", {
  method: 'POST',
  body:JSON.stringify({
    client_id:"5qPGYJldJSquweETTRCQPfuaJKAcMUKm",
    client_secret: "sgSEQ-21ygUw0mrOURhNxistL7AqBtg0hIQCgner8KwqkBVyy303dqyS3p21mkjo",
    audience: "https://integration.spokephone.com",
    grant_type:"client_credentials"
  }),
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
});
const res=await apiResults.json();
return  res;

}
const perform =async (z, bundle) => {
  const token1=await fetchToken(z,bundle);
// const token = await getToken();
//    token["id"]="2323";
//    token1["id"]="sdfsf";
  //    return[token1];
  var calls = [];
var direction = bundle.inputData.direction;
var timeStamp = Math.floor(Date.now() / 1000);
const options = {
  url: 'https://integration.spokephone.com/calls',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    // 'X-CLIENT-ID': bundle.authData.client_id,
    // 'X-CLIENT-SECRET': bundle.authData.client_secret
   'Authorization':'Bearer '+token1.access_token
   // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVTROREl3TlVRMk1Ua3lSVU15UlVFMU9VRkdNRGsyT1RaR1FVVXlNa1U0TmtFd01FRXhOUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLnNwb2tlcGhvbmUuY29tL29yZ2FuaXNhdGlvbklkIjoiMjY4YTgzZDEtYjUwNC0xMWVhLTllNTAtYzE0NGQ4OThkYWJkIiwiaHR0cHM6Ly9pbnRlZ3JhdGlvbi5zcG9rZXBob25lLmNvbS9pbnRlZ3JhdGlvbklkIjoiMDkzNmFkZTAtYmM1Mi0xMWVhLTljMTMtNDU5YTc5MzEwMjMwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNwb2tlcGhvbmUuY29tLyIsInN1YiI6IjVxUEdZSmxkSlNxdXdlRVRUUkNRUGZ1YUpLQWNNVUttQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2ludGVncmF0aW9uLnNwb2tlcGhvbmUuY29tIiwiaWF0IjoxNTkzOTIwNTgwLCJleHAiOjE1OTQwMDY5ODAsImF6cCI6IjVxUEdZSmxkSlNxdXdlRVRUUkNRUGZ1YUpLQWNNVUttIiwic2NvcGUiOiJjcmVhdGU6cGhvbmVib29rIHJlYWQ6cGhvbmVib29rIHVwZGF0ZTpwaG9uZWJvb2sgZGVsZXRlOnBob25lYm9vayByZWFkOmNhbGwgcmVhZDp0cnVuayByZWFkOmRldmljZSB1cGRhdGU6ZGV2aWNlIGNyZWF0ZTpkZXZpY2UgcmVhZDp1c2VyIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.XsxLdAPWbpbNQ2nF83ZS-aPPnDcHDN_VVzIf3FwQdSsNg5spUnmQ5qXtD4HJu_kZ6Ulus5kf6yUkAdv9MNPvbMZxHuT0Ya0WXv2zWqJqZ1jjBSvqlpzhXMiBbz5lF3pCZCUWs8thse1-12vGz1nqcdKgWYRh4N5Li4B4X22a44jAclIRdINU7bHGMmCY0pJipE2PkB0dmcGbyhaOCseGkZkpJaqffva6FV73oClXyqF0GaOdvQWeU06HMYxUKwm1WdVw50At5GwOHKxP_2fnqP7CzC__WYvUf_7QX_wp7yTRBtXpXBmaqjHMS4btk327F_xnIzR-I70r7MMTWWHMNg'
   },
  params: {
    'since': timeStamp,
    'limit': '1000'
  },
  body:{
  }
}

return z.request(options)
  .then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    // return results.calls;
    
    for (let i=0; i<results.calls.length; i++){
      if (results.calls[i]["direction"] == direction){
        calls.push(results.calls[i])
      }
    }
    
    return calls;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'direction',
        type: 'string',
        label: 'Direction',
        choices: ['inbound', 'outbound'],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      summary: {
        header: 'Inbound call from +61448432255 to +61745236707',
        companyNumberDescription: 'Called in to +61745236707',
        contactNumberDescription: 'Called in from +61448432255',
        outcome: 'Caller abandoned call.',
      },
      durationText: 'a few seconds',
      lastModifiedAt: '2020-06-23T04:26:10.877Z',
      initiator: '+61448432255',
      assignedContact: {},
      startedAt: '2020-06-23T04:26:01.986Z',
      lastModifiedTimestamp: 1592886370877,
      startedTimestamp: 1592886361986,
      isInternal: false,
      duration: 8609,
      companyNumber: '+61745236707',
      recordings: [],
      endedAt: '2020-06-23T04:26:10.595Z',
      recipient: '+61745236707',
      contactNumber: '+61448432255',
      id: 'a543f990-b509-11ea-a1f6-0bf09845eafc',
      user: {},
      assignedUser: {},
      status: 'abandoned',
      direction: 'inbound',
    },
    outputFields: [
      { key: 'summary__header' },
      { key: 'summary__companyNumberDescription' },
      { key: 'summary__contactNumberDescription' },
      { key: 'summary__outcome' },
      { key: 'durationText' },
      { key: 'lastModifiedAt' },
      { key: 'initiator' },
      { key: 'startedAt' },
      { key: 'lastModifiedTimestamp' },
      { key: 'startedTimestamp' },
      { key: 'isInternal' },
      { key: 'duration' },
      { key: 'companyNumber' },
      { key: 'endedAt' },
      { key: 'recipient' },
      { key: 'contactNumber' },
      { key: 'id' },
      { key: 'status' },
      { key: 'direction' },
    ],
  },
  key: 'new_calls',
  noun: 'Call',
  display: {
    label: 'New Calls',
    description: 'This will collect all the list of calls (inbound & outbound)',
    hidden: false,
    important: true,
  },
};
