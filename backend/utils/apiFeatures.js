class APIfeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // search function
  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }
  //filter function
  //   category
  filter() {
    const getQuerystring = { ...this.queryStr };
    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete getQuerystring[field]);
    // console.log(getQuerystring);
    //price
    let queryStr = JSON.stringify(getQuerystring);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    // console.log(queryStr)
    return this;
  }
//pagination
  paginate(pagination) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = pagination * currentPage - 1;
    // console.log(skip)
    this.query.limit(pagination).skip(skip);
    return this;
  }
}

module.exports = APIfeatures;
