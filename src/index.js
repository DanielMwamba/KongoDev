const express = require("express");









/***  GENERAL SETUP ****/

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next()
});




/***  RUN SERVER ****/

app.listen(PORT, () => {
    console.log(`he server listens on http:/localhost:${PORT}`)
})
