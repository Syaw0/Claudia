import { createClient } from "redis";
import { createPool } from "mariadb";
import dotEnv from "dotenv";

dotEnv.config();

const RedisPassword = process.env.REDIS_PASSWORD;
const MariaPassword = process.env.Maria_PASSWORD;
const MariaUser = process.env.Maria_User;

const pool = createPool({
  port: 3030,
  host: "localhost",
  user: MariaUser,
  password: MariaPassword,
  database: "blogish",
});

const redisClient = createClient({
  socket: {
    port: 3232,
    host: "localhost",
  },
  password: RedisPassword,
});

export { pool, redisClient };
