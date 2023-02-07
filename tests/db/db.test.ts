import prepareTestDbEnvironment from "../../scripts/initial";
import { PoolConnection } from "mariadb";
import { userFields } from "./dbFields";
import { SHA256 } from "crypto-js";

let redisClient: any;
let mariaClient: PoolConnection;
let killContainers: any;

describe("Test : DB", () => {
  beforeAll(async () => {
    // * Also we can use any pool like real DB! (but use backup of real db)
    // * to check if db is work correctly!
    const clients = await prepareTestDbEnvironment();
    mariaClient = clients.mariaClient;
    redisClient = clients.redisClient;
    killContainers = clients.killContainers;
  });

  afterAll(async () => {
    await mariaClient.end();
    await redisClient.quit();
    // killContainers();
  });
  it("Test If Database Created ", async () => {
    const databases = await mariaClient.query("SHOW DATABASES");
    const res = databases.filter((db: { Database: string }) => {
      return db.Database === "cloudia";
    });
    expect(res).toHaveLength(1);
  });

  it("Test if Tables Are Created", async () => {
    const tables = await mariaClient.query("SHOW TABLES from cloudia");
    const res = tables.filter((table: { Tables_in_cloudia: string }) => {
      return table.Tables_in_cloudia === "users";
    });
    expect(res).toHaveLength(1);
  });
  it("Test MARIADB Fields: USER TABLE", async () => {
    const users = await mariaClient.query("DESCRIBE cloudia.users");

    users.forEach((user: any) => {
      const tmp: any = userFields[user.Field as keyof typeof userFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(user[tmpKey]);
      });
    });
  });

  it("Test Insert To MARIADB : User ", async () => {
    const hashedPassword = SHA256("123123123").toString();
    await mariaClient.query(
      "INSERT INTO cloudia.users (name,password,email) VALUES(?,?,?)",
      ["Siavash", hashedPassword, "someMagicEmail@gmail.com"]
    );
    let user = await mariaClient.query(
      'SELECT * FROM cloudia.users WHERE name="Siavash" and email="someMagicEmail@gmail.com"'
    );
    expect(user).toHaveLength(1);
    user = user[0];
    expect(user.name).toEqual("Siavash");
    expect(user.email).toEqual("someMagicEmail@gmail.com");
    expect(user.profileUrl).toEqual("/prof/default.png");
    expect(user.password).toEqual(hashedPassword);
    // expect(user.id).toEqual('4') //! this is uncertain!
  });

  it("Test Insert To MARIADB : if user with same email insert mariadb will throw error ", async () => {
    try {
      await mariaClient.query(
        "INSERT INTO cloudia.users (name,password,email) VALUES(?,?,?)",
        ["Majid", SHA256("123123").toString(), "someMagicEmail@gmail.com"]
      );
    } catch (err) {}
    let user = await mariaClient.query(
      'SELECT * FROM cloudia.users WHERE name="Majid" and email="someMagicEmail@gmail.com"'
    );
    expect(user).toHaveLength(0);
  });
});
