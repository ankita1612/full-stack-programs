import { Queue } from 'bullmq';

const myQueue = new Queue('myQueue', {
  connection: { host: '127.0.0.1', port: 6379 }
});

await myQueue.add('job1', { data: 'Hello Job!' });
console.log('Job added');
