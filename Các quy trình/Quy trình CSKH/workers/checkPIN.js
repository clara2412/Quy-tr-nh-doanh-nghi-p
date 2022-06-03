const { Client, logger } = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);


client.subscribe("checkPinCode", async function({ task, taskService }) {
    let pinCode = task.variables.get("pinCode");
  
    await taskService.complete(task);
});
