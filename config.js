const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG: process.env.ALIVE_IMG || "https://t4.ftcdn.net/jpg/05/68/98/19/360_F_568981938_R87rarBphgiNJ4Kiqj0IQM6aAFgA5VWX.jpg"
ALIVE_MSG: process.env.ALIVE_MSG || "හාලෝ මම ඩ්‍රැකියුලා I am alive new".
};
