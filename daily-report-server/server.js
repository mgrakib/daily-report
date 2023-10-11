/** @format */

const express = require("express");
const cors = require("cors");
const router =require('./routers/index')
const app = express();
const PORT = process.env.PORT | 4000;
const connectDB = require("./DB/db");
app.use([cors(), express.json()]); //middleware


app.use(router);
app.get("/", (req, res) => {
	res.json({ message: "all okay" });
});



app.use((err, req, res, _next) => {
    const status = err.status || 500
    const message = err.message || "something went occurred";
    res.status(status).json({message})
})


connectDB("mongodb://127.0.0.1:27017/daily-report")
	.then(
		() => console.log("database connect"),
		app.listen(PORT, () => {
			console.log(`daily-report server is running on ${PORT}`);
		})
	)
	.catch(e => {
		console.log(e);
	});
