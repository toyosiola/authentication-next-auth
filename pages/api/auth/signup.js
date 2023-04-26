import { hashPassword } from "../../../utils/auth/passwordHandler";
import mongoClient from "../../../utils/mongodb/mongoConnect";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ msg: "HTTP method not allowed" });
  }

  const { username, email, password, matching_password } = JSON.parse(req.body);

  // validating inputs
  if (!username || !email || !password || !matching_password) {
    res.status(422).json({ msg: "Provide all inputs" });
  }

  if (username.includes(" ") || email.includes(" ")) {
    res.status(422).json({ msg: "Space is not allowed in the inputs" });
  }

  if (!email.includes("@")) {
    res.status(422).json({ msg: "Invalid email address" });
  }

  if (password !== matching_password) {
    res.status(422).json({ msg: "Passwords not matching" });
  }

  if (password.length < 7) {
    res.status(422).json({ msg: "Password can not be less than 7 characters" });
  }

  const hashedPassword = await hashPassword(password);

  // DATABASE OPERATIONS
  let client;
  try {
    // connecting to database
    client = await mongoClient();
    const db = client.db("auth-demo");
    // choosing a specific collection from the database
    const usersCollection = db.collection("users");
    // storing data to database
    await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });
    // close connection to database
    client.close();
    res.status(201).json({ msg: "Account created successfully!" });
  } catch (error) {
    if (client) {
      client.close();
    }
    res.status(502).json({
      msg: "Error creating account! try again.",
    });
  }
}
