const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
app.use("/src", express.static(path.join(__dirname, "../src")));
app.use(express.static(path.join(__dirname, "./assets")));

// API endpoint to generate the PDF URL
app.get("/generate-pdf-url", (req, res) => {
	const f = {
		year: req.query.year,
		subject: req.query.subject,
		paper: req.query.paper,
		tier: req.query.tier,
		type: req.query.type,
		unit: req.query.unit,
	};
	const pdfURL = `${f.tier}_${f.subject}_${f.year}_P${f.paper}_${f.unit}_${f.type}.pdf`;
	res.json({ pdfURL });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
