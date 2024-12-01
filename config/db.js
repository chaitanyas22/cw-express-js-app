const { MongoClient } = require('mongodb');

const connectDB = async () => {
  const uri = 'mongodb://localhost:27017/after_school_activities';
  
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("MongoDB Connected");

    return client.db();
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
