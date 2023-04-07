const fs = require("fs");

const getConfig = () => {
  const path = process.cwd();
  const raw = fs.readFileSync(`${path}/config.json`, "utf8");
  return JSON.parse(raw);
};

module.exports = { getConfig };
