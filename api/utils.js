const fetch = require("node-fetch");
const FormData = require('form-data');

const { inspect } = require('util');
const exp = require("constants");

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

exports.save = async data => {
  const form = new FormData();
  form.append('file', inspect([data]), 'cmdList.json');

  fetch('https://discord.com/api/v10/channels/1052765687476666368/messages',{
    headers: { "Authorization": `Bot ${process.env.TOKEN}` },
    method: "POST",
    body: form
  });
};

exports.load = async () => {
  const data = await fetch(
    'https://discord.com/api/v10/channels/1052765687476666368/messages?limit=1',{
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bot ${process.env.TOKEN}`
    },
    method: "GET"
  });
  const message = JSON.parse(await data.text())[0];
  const result = await fetch(message.attachments[0].url, {method:'GET'});
  
  return eval(await result.text())[0];
};

exports.command = async () => {
  return require('./commands');
};