const openSourceUtils = require("../utils/open-source");

class OpenSourceService {
  constructor() {}

  async getNews() {
    const newsData = await openSourceUtils.getNews();
    if (newsData.isDependencyError)
      return new Error("Error while fetching news");
    const articles = [];
    newsData?.data?.articles?.forEach((item) => {
      articles.push({
        author: item?.author?.replace(/[^a-zA-Z0-9 ]/g, ""),
        title: item?.title.replace(/[^a-zA-Z0-9 ]/g, ""),
        description: item?.description?.replace(/[^a-zA-Z0-9 ]/g, ""),
        content: item?.content?.replace(/[^a-zA-Z0-9 ]/g, ""),
        publishedAt: item?.publishedAt,
        url: item?.url,
        urlToImage: item?.urlToImage,
      });
    });

    return articles;
  }

  async getUsers() {
    const usersData = await openSourceUtils.getUsers();
    if (usersData.isDependencyError)
      return new Error("Error while fetching users");
    return usersData.data;
  }
}

module.exports = OpenSourceService;
