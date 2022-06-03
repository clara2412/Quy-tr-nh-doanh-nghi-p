const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

const client = new Client(config);

client.subscribe("sendEmail-suburban", async function({ task, taskService }) {
  let bookName = task.variables.get("bookName");
  let address = task.variables.get("customerAddress");
  let dayReceive = task.variables.get("dayReceive");
  let customerEmail = task.variables.get("customerEmail");
  let cityType = task.variables.get("cityType");
  
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({   
    service: 'gmail',
    auth: {
      user: 'longhai.hua1006@gmail.com',
      pass: 'Game0988'
    },
    tls:{
          rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: 'longhai.hua1006@gmail.com',
    to: `${customerEmail}`,
    subject: 'CONFIRM ORDER - BUYING BOOK',
    text: `
    YOUR ORDER HAS BEEN RECEIVED!!
    This is your order:
    Name of the Book: ${bookName}
    Address: ${address}
    Day Receive: ${dayReceive}
    Type of City: ${cityType}
    Please reply 'Yes that is my order' to complete the confimation!
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  var temp = transporter.sendMail(declinedEmail, function(error, info){
    if (error) {
       console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
});
  

  await taskService.complete(task);
});


