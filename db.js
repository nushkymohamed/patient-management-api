const mongoose = require('mongoose');
// df
mongoose.connect(
  'mongodb+srv://root:root@cluster0.2wnw92d.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
