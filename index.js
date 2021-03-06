const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;
const { encrypt, decrypt } = require("./EncryptWare");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root123",
  database: "PasswordManager",
});

// app.get("/", (req, res) => {
//   res.send("Hello World ");
// });

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, results) => {
    if (err) {
      console.log(err);
    } else res.send(results);
  });
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashPassword = encrypt(password);

  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashPassword.password, title, hashPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => {
  console.log("Server Initiated");
});
