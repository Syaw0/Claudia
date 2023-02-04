import dotEnv from "dotenv";
import childProcess from "child_process";
import seedDb from "./seed";
dotEnv.config();

const RedisPassword = process.env.REDIS_PASSWORD;
const RedisContainerName = "Redis";

const MariaPassword = process.env.Maria_PASSWORD;
const MariaUser = process.env.Maria_User;
const MariaContainerName = "Maria";

const dockerRunRedisCmd = `docker run -d -p 3232:6379 --rm --name=${RedisContainerName} -e REDIS_PASSWORD=${RedisPassword} public.ecr.aws/ubuntu/redis:latest`;
const dockerRunMariaCmd = `docker run -d -p 3030:3306 --rm --name=${MariaContainerName} -e MARIADB_ROOT_PASSWORD=${MariaPassword} public.ecr.aws/docker/library/mariadb:latest`;

const stopContainerCmd = (name: string) => {
  return `docker stop ${name}`;
};
const killContainers = () => {
  try {
    childProcess.execSync(stopContainerCmd(RedisContainerName));
  } catch (err) {}
  try {
    childProcess.execSync(stopContainerCmd(MariaContainerName));
  } catch (err) {}
};

const prepareTestDbEnvironment = async () => {
  try {
    childProcess.execSync(stopContainerCmd(RedisContainerName));
  } catch (err) {}
  try {
    childProcess.execSync(stopContainerCmd(MariaContainerName));
  } catch (err) {}
  childProcess.execSync(dockerRunRedisCmd);
  childProcess.execSync(dockerRunMariaCmd);

  const { createPool } = await import("mariadb");
  const pool = createPool({
    port: 3030,
    host: "localhost",
    user: MariaUser,
    password: MariaPassword,
  });

  const redis = await import("redis");
  const redisClient = redis.createClient({
    socket: {
      port: 3232,
      host: "localhost",
    },
    password: RedisPassword,
  });
  await redisClient.connect();
  await seedDb(redisClient, pool);
  const mariaClient = await pool.getConnection();
  return { redisClient, mariaClient, killContainers };
};
export default prepareTestDbEnvironment;
