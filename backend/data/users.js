import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Cliff',
    email: 'cliff@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sherry',
    email: 'sherry@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
