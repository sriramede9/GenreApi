const bcrypt = require("bcryptjs");

async function run() {
  const sand = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash("1234", sand);
  console.log(hash);
}

run();
