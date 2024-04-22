const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;
 
app.post('/webhook', (req, res) => {
    
    const message = req.body; 
    console.log('Received message from Twilio:', message);
   
    res.status(200).end();
  });
 
app.post('/webhook/status', express.json(), (req, res) =>  {
    console.log(req.body);
    console.log(req.body.SmsStatus);
    res.send('send via callback');
});
app.post('/', express.json(), (req, res) =>  {

  res.send('HomePage');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
 
console.log('Express server has been started.');