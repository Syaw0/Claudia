import { Pool } from "mariadb";

const seedDb = async (redisClient: any, mariaClient: Pool) => {
  // we have 3 session
  // 1. login session db:1
  // 2. 2fa session db:2
  // 3. resetPassword session db:3

  await redisClient.select(1);
  const con = await mariaClient.getConnection();
  await con.query("CREATE DATABASE cloudia");
  await con.query(
    "CREATE TABLE cloudia.users (name varchar(30) not null default('unnamed'),email varchar(120) not null UNIQUE,password char(64) not null,profileUrl varchar(100) not null default('/prof/default.png'),userId int not null auto_increment primary key)  ;"
  );
};

export default seedDb;
