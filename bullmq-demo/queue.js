const { Queue } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis({
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

const jobQueue = new Queue("jobQueue", { connection });

module.exports = jobQueue;
