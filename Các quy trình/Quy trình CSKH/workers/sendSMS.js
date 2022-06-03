
const { Client, logger } = require("camunda-external-task-client-js");
const { text } = require("stream/consumers");
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);
var pinCode;
const lhPhoneNumber = '925624469';
const thaPhoneNumber = '913715909';
client.subscribe("sendSmsPIN", async function({ task, taskService }) {
    const Vonage = require('@vonage/server-sdk');
    const vonage = new Vonage({
        apiKey: "12a5d843",
        apiSecret: "fjQ1cZATs2p5asAC"
    });
    
    pinCode = Math.floor(Math.random() * 9999) + 900;  

    const from = "SAMSUNG";
    const to = `84${thaPhoneNumber}`;
    const text =   `PIN: ${pinCode}`;

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
