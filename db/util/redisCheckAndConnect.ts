import { RedisClientType } from "@redis/client";

const redisCheckAndConnect = async (redisClient: any) => {
  if (!redisClient.isOpen || !redisClient.isReady) {
    await redisClient.connect();
  }
};

export default redisCheckAndConnect;
