import { createClient } from 'redis';

// Connect to Redis running on localhost:6379
const client = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

// Set a key
await client.set('message', 'Hello from Node!');

// Get the key
const value = await client.get('message');
console.log('Value from Redis:', value);

await client.disconnect();
