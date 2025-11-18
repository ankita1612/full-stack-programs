import { Worker } from 'bullmq';

const worker = new Worker('myQueue', async job => {
  console.log('Processing job:', job.name, job.data);
}, {
  connection: { host: '127.0.0.1', port: 6379 }
});
