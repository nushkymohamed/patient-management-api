const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://root:root@cluster0.2wnw92d.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
