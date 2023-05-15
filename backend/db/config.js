const mongoose= require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/e-commerce');

// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });
