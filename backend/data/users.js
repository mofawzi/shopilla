import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mohamed Fawzy",
    email: "mohamed@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ahmed Alaa",
    email: "ahmed@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
