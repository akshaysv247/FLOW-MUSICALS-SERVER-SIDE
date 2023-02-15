const dotenv = require('dotenv');

const express = require('express');

const cors = require('cors');

const Database = require('./config/config');

const UserRoutes = require('./routes/userRoutes');
const AdminRoutes = require('./routes/adminRoutes');
const ArtistRoutes = require('./routes/artistRoutes');

dotenv.config();
// database
Database();

const app = express();

// cors
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/', UserRoutes);
app.use('/admin', AdminRoutes);
app.use('/artist', ArtistRoutes);

// port
app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT);
});
