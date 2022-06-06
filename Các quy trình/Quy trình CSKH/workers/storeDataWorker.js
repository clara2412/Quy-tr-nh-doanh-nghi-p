const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");
const cstVariables = require("../Variables/variables.js")

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);
const fs = require("fs");
client.subscribe("storeUserData", async function({ task, taskService }) {
    let userFullName = task.variables.get("userFullName");
    let userPhoneNumber = task.variables.get("userPhoneNumber");
    let userEmail  = task.variables.get("userEmail");
    let userProb = task.variables.get("userProb");
   
    var storage = {}
    storage.table = []
    var user = {
        name: userFullName, 
        phoneNumber: userPhoneNumber, 
        email: userEmail, 
        prob: userProb
    };
    storage.table.push(user)

    fs.writeFile('userData.json', JSON.stringify(storage),  function(err) {
        if (err) {
            return console.error(err);
        }
        fs.readFile('userData.json', function (err, data) {
           if (err) {
              return console.error(err);
           }
           console.log('');
        });
     });

  await taskService.complete(task);
});
