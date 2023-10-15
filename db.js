const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://root:root@cluster0.2wnw92d.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
