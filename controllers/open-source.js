const axios = require("axios");
const OpenSourceService = require("../services/open-source");

async function getNews(req, res) {
  try {
    const openSourceService = new OpenSourceService();
    const articles = await openSourceService.getNews();
    if (articles instanceof Error) return [];
    res.locals = Object.assign({ title: "News" }, res.locals);
    return res.render("news", { newsData: articles });
  } catch (err) {
    console.log("elrek");
  }
}

async function getUsers(req, res) {
  try {
    res.locals = Object.assign({ title: "Users" }, res.locals);
    return res.render("users");
  } catch (err) {
    console.log("elrek");
  }
}

async function getUsersApi(req, res) {
  try {
    const { draw } = req.query;
    const openSourceService = new OpenSourceService();
    const usersList = await openSourceService.getUsers();
    return res.send({
      draw: Number(draw),
      recordsTotal: usersList?.length,
      recordsFiltered: usersList?.length,
      data: usersList,
    });
  } catch (err) {
    console.log("elrek");
  }
}

module.exports = { getNews, getUsers, getUsersApi };
