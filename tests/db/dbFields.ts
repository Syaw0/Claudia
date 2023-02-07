const userFields = {
  name: {
    Field: "name",
    Type: "varchar(30)",
    Null: "NO",
    Key: "",
    Default: "unnamed",
    Extra: "",
  },
  email: {
    Field: "email",
    Type: "varchar(120)",
    Null: "NO",
    Key: "UNI",
    Default: null,
    Extra: "",
  },
  password: {
    Field: "password",
    Type: "char(64)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  profileUrl: {
    Field: "profileUrl",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: "/prof/default.png",
    Extra: "",
  },
  userId: {
    Field: "userId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
};

export { userFields };
