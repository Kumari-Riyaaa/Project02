// const express = require('express');
 //const bodyParser = require('body-parser');
 //const { MessagingResponse } = require('twilio').twiml;
 
// const app = express();
// const port = process.env.PORT || 9000;
 
// // Middleware to parse incoming request bodies
// app.use(bodyParser.urlencoded({ extended: false }));
 
// // Handle incoming messages
// app.post('/webhook', (req, res) => {
//   const incomingMessage = req.body.Body;
 
//   // Here you can implement your logic to process incoming messages
//   // For demonstration purposes, let's just echo the incoming message back to the sender
//   const twiml = new MessagingResponse();
//   twiml.message(`You said: ${incomingMessage}`);
 
//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// });
 
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });


const { MessagingResponse } = require('twilio').twiml;
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 9000;
// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
// Handle incoming messages
app.post('/webhook', async (req, res) => {
  const incomingMessage = req.body.Body;
 
  try {
    // Fetch data from glamgpt-dev-funapp/HttpTrigger01
    const response = await axios.post(
      'https://jb-apim-d-gw01.azure-api.net/glamgpt-dev-funapp/HttpTrigger01',
      {
        data: incomingMessage,
        profile: {
          Name: 'Rahul',
          gender: 'Male',
          Age: 28,
          Location: 'UK',
          Preference: 'Vegan',
        },
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': '17e86368d44c48ecbea07e5b0c359583',
        },
      }
    );
 
    // Extract data from the response
    
    const responseData = response.data.data[0].content;
    //const responseData =response.data.data;
    console.log("Rii",response)

 
    // Here you can implement your logic to process incoming messages and the response from the API
    // For demonstration purposes, let's just echo the incoming message and the response back to the sender
    const twiml = new MessagingResponse();
    twiml.message(responseData);
 
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (error) {
    console.error('Error fetching data from API:', error);
 
    // Handle errors
    const twiml = new MessagingResponse();
    twiml.message('An error occurred while processing your request.');
 
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});