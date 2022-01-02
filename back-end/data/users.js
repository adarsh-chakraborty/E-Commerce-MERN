import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Adarsh Chakraborty',
    email: 'adarshc@duck.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('1234', 10)
  },
  {
    name: 'Jane Doe',
    email: 'Jane@demo.gq',
    password: bcrypt.hashSync('1234', 10)
  }
];

export default users;
