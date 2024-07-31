import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";


const homeStartingContent = "“Your first blog posts won’t be perfect, but you just have to do it. You have to start somewhere. ~Shane Barker";
const aboutContent = "Hi there!, My name is Vinit sonawane. I'm an enthusiastic web developer who enjoys writing code and creating new things. I have a solid background in computer science and a constant desire to learn new skills. I've built this web apps with Node.js and Express.js, and I'm learning how to use MangoDB and React. I am searching for a full-time job as a web developer, or merely a front end developer, and I am currently open to new chances.";
const contactContent = "I'd love to hear from you! Feel free to contact me by sending me an email at :";
const app = express();
const port = process.env.PORT || 5000;

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
}
);

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
}
);
app.get("/compose", function (req, res) {
  res.render("compose");
}
);
app.post("/compose", function (req, res) {
  const post = {
    id: posts.length + 1,
    title: req.body.postTitle,
    content: req.body.postBody
  };
  console.log(post);
  posts.push(post);
  res.redirect("/");
}
);
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find(post => post.id === requestedPostId);

  if (post) {
    res.render("post", {
      id: post.id,
      title: post.title,
      content: post.content
    });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:postId/edit", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find(post => post.id === requestedPostId);

  if (post) {
    res.render("edit", {
      id: post.id,
      title: post.title,
      content: post.content
    });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/posts/:postId/edit", (req, res) => {
  const requestedPostId = Number(req.params.postId);

  const post = posts.find(post => post.id === requestedPostId);

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

  const post = posts.find(post => post.id === requestedPostId);

  if (post) {
    posts = posts.filter(post => post.id !== requestedPostId);
    res.redirect("/");

  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
