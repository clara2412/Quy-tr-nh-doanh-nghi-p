const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");
const cstVariables = require("../Variables/variables.js")

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

client.subscribe("sendConfirmEmail", async function({ task, taskService }) {
  let customerEmail = task.variables.get("userEmail");
  
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
    subject: '  Thank you for choosing our service  ',
    text:  ` Email Content... `,
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
