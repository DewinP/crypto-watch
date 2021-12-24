export default {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || "mongodb://localhost/mern-starter",
  origin: process.env.ORIGIN || "http://localhost:3000",
};
