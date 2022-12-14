const fetch = require("node-fetch");

require('dotenv').config();

const url = `https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`;

const headers = { "Content-Type": "application/json","Authorization": `Bot ${process.env.TOKEN}` };

exports.set = async data => {
  const result = await fetch(url, { headers, method: "PUT", body: JSON.stringify(data) });

  if (result.ok) return true;
  else {
    const text = await result.text();
    console.log(text);
    return false;
  }
};

exports.get = async id => {
  const result = await fetch(url + (id ? `/${id}`:''), { headers, method: "GET" });

  const text = JSON.parse(await result.text());
  return text;
};

exports.add = async data => {
  const result = await fetch(url, { headers, method: "POST", body: JSON.stringify(data) });

  if (result.ok) return true;
  else {
    const text = await result.text();
    console.log(text);
    return false;
  }
};

exports.delete = async id => {
  const result = await fetch(`${url}/${id}`, { headers, method: "DELETE" });
  const text = await result.text();

  return !text;
};