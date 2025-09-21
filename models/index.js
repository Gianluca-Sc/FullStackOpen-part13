import Blog from "./blog.js";
import ReadingList from "./readingList.js";
import User from "./user.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "readers" });

export { Blog, User };
