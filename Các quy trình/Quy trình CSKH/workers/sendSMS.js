const { Client, logger } = require("camunda-external-task-client-js");
const { text } = require("stream/consumers");
const cstVariables = require("../Variables/variables.js")
const Vonage = require('@vonage/server-sdk');

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

client.subscribe("sendSmsPIN", async function({ task, taskService }) {
    const vonage = new Vonage({
        apiKey: cstVariables.apiKey,
        apiSecret: cstVariables.apiSecret
    });
    const from = "SAMSUNG";
    const to = `84${cstVariables.lhPhoneNumber}`;
    const text =   `Your verify PIN is ${cstVariables.pinCode}    `;

    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
    await taskService.complete(task);
});
