const express = require("express");
const twilio = require("twilio");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3011;
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


app.post("/makecall", (req, res) => {
    const {number} = req.query;
  client.calls
    .create({
      url: `${process.env.URL}:${port}/twiml`,
      to: number,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((call) => console.log(call.sid))
    .done();

  res.send("Call in progress...");
});

app.post("/twiml", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Hello from Twilio!", {
    voice: "alice",
  });
  res.type("text/xml");
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Twilio app listening on port ${port}`);
});
