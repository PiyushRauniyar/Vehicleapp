const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gpsRoutes = require('./routes/gpsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Vehicle Stoppage API!');
});

app.use('/api/gps', gpsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
