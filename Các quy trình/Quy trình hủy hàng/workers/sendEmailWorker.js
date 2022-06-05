const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");
const cstVariables = require("../Variables/variables.js")

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

client.subscribe("sendConfirmFeedbackEmail", async function({ task, taskService }) {
  let customerEmail = task.variables.get("userEmail");
  let customerName = task.variables.get("userName");
  let customerSurname = task.variables.get("userSurname");
  
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({   
    service: 'gmail',
    auth: {
      user: cstVariables.userEmail,
      pass: cstVariables.userPass
    },
    tls:{
          rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: cstVariables.userEmail,
    to: `${customerEmail}`,
    subject: '  Thank you for your feedback  ',
    text:  cstVariables.emailContent,
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
