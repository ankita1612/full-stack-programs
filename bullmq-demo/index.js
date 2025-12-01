//npm install express bullmq ioredis
//✅ Step 1: Check running containers : docker ps
//✅ Step 2: Stop the running Redis container : docker stop redis-server
//✅ Step 3: Remove the old Redis container : docker rm redis-server
//✅ Step 4: Start Redis again properly : docker run -d --name redis-server -p 6379:6379 redis
//http://localhost:3000/send-message
// node index.js
// node worker.js


const express = require("express");
const jobQueue = require("./queue");
require("./worker");  // start worker automatically

const app = express();
app.use(express.json());

// Route that adds job to BullMQ queue
app.post("/send-message", async (req, res) => {
  const { deliveryBoyId, message } = req.body;

  await jobQueue.add("notifyDeliveryBoy", {
    deliveryBoyId,
    message,
    "email":"ankita@yopail.com"
  });

  res.json({ status: "Job added to queue" });
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});
