class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(key);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const remove = ["keyword", "limit", "page"];
    remove.forEach((el) => delete queryCopy[el]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(gamesPerPage) {
    const page = Number(this.queryStr.page) || 1;
    const skip = gamesPerPage * (page - 1);

    this.query = this.query.limit(gamesPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
