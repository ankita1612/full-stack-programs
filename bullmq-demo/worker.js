const { Worker } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis({
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log("Job name: ", job.name +"  deliveryBoyId :" +job.data.deliveryBoyId + " message: "+job.data.message +  "email :" +job.data.email);   
    
  },
  { connection }
);

module.exports = worker;
