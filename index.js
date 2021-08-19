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
    const d = new Date();
    logger.info(`1 BTC = ${response.data["USD"]["last"]} at ${d}`);
    return res.json(`1 BTC = ${response.data["USD"]["last"]} at ${d}`);
  } catch (error) {
    logger.error(`${error}`);
    return res.json(`${error}`);
  }
}
