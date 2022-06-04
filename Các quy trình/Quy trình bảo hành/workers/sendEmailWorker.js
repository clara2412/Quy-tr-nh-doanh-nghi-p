const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");
const { text } = require("stream/consumers");

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const passwordClient = "Game0988";
const client = new Client(config);

client.subscribe("sendConfirmFeedbackEmail", async function({ task, taskService }) {
 
  let customerEmail = task.variables.get("userEmail");
  let customerName = task.variables.get("userName");
  let customerSurname = task.variables.get("userSurname");


  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({   
    service: 'gmail',
    auth: {
      user: '20521277@gm.uit.edu.vn',
      pass: 'Game0988'
    },
    tls:{
          rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: '20521277@gm.uit.edu.vn',
    to: `${customerEmail}`,
    subject: '  TITLE ',
    text:  '',
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  await taskService.complete(task);
});
