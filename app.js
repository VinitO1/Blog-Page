import express from "express";
import bodyParser from "body-parser";

import _ from "lodash";

const homeStartingContent =
  "Discover insightful articles on web development, emerging technology trends, and best coding practices. Whether you're a beginner or an experienced developer, our blog provides valuable content to help you enhance your skills and stay ahead in the industry.";

const aboutContent =
  "Hi there! I'm Vinit Sonawane, an enthusiastic web developer passionate about writing code and building innovative applications. With a strong background in computer science, I have a continuous drive to learn new technologies. I developed this web app using Node.js and Express.js,  and EJS. I’m actively seeking a full-time opportunity as a web developer or front-end developer and am open to new challenges.";

const contactContent =
  "I'd love to hear from you! Feel free to reach out via email at: vinit.sonawane00@gmail.com";

const app = express();
const port = process.env.PORT || 5000;

let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = {
    id: posts.length + 1,
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  console.log(post);
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find((post) => post.id === requestedPostId);

  if (post) {
    res.render("post", {
      id: post.id,
      title: post.title,
      content: post.content,
    });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:postId/edit", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find((post) => post.id === requestedPostId);

  if (post) {
    res.render("edit", {
      id: post.id,
      title: post.title,
      content: post.content,
    });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/posts/:postId/edit", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find((post) => post.id === requestedPostId);

  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;

    // Redirect to the post view page after editing
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:postId/delete", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find((post) => post.id === requestedPostId);

  if (post) {
    posts = posts.filter((post) => post.id !== requestedPostId);
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
