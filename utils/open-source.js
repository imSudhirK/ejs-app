require("dotenv").config();
const axios = require("axios");

async function getNews(country = "in", pageSize = 100) {
  const url = `${process.env.NEWS_API_URL}?country=${country}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
  try {
    return await axios.get(url);
  } catch (err) {
    return { isDependencyError: true };
  }
}

async function getUsers(req, res) {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    return await axios.get(url);
  } catch (err) {
    return { isDependencyError: true };
  }
}

module.exports = { getNews, getUsers };
