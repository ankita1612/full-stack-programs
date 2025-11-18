const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// Create Redis client
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
  await redisClient.connect();
}
connectRedis();

// Simulate fetching user from DB
function getUserFromDB(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}`, age: 20 + Number(userId) });
    }, 2000); // simulate 2 seconds DB delay
  });
}

// Route to get user
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // 1️⃣ Check if data exists in Redis
    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
      return res.json({
        source: 'cache',
        data: JSON.parse(cachedUser)
      });
    }

    // 2️⃣ If not in cache, fetch from "DB"
    const user = await getUserFromDB(userId);

    // 3️⃣ Store in Redis for 10 seconds
    await redisClient.setEx(`user:${userId}`, 10000, JSON.stringify(user));

    // 4️⃣ Send response
    res.json({
      source: 'db',
      data: user
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
