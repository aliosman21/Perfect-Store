const mongoose = require("mongoose");

const establishConnection = () => {
   mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   });
   console.log("Establishing connection to DB");
};

const closeEstablishedConnection = () => {
   mongoose.disconnect();
   console.log("Connection To DB Closed");
};

module.exports = {
   establishConnection: establishConnection,
   closeConnection: closeEstablishedConnection,
};
