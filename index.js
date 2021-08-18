const express = require("express");
const axios = require("axios");
const winston = require("winston");

const logConfiguration = {
  transports: [new winston.transports.Console()],
};

const app = express();
const port = process.env.PORT || 3000;
const logger = winston.createLogger(logConfiguration);

app.get("/", (req, res) => {
  getBitCoinUSD(res);
});
 
app.listen(port, () => {
    logger.info(`listening on port ${port}`);
});

async function getBitCoinUSD(res) {
  try {
    const response = await axios.get("https://blockchain.info/ticker");
    logger.info(response.data["USD"]);
    return res.json(response.data["USD"]);
  } catch (error) {
    logger.info(error);
  }
}
