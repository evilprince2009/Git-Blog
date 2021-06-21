import express from "express";
import mongoose from "mongoose";
import path from "path";
const Blog = require("./models/blog");

// Use your OWN credentials here
const port: number = 5700; // Your custom port
const connectionString: string =
  "mongodb+srv://nahian:619961@express-app.eljla.mongodb.net/express-app?retryWrites=true&w=majority"; // Your MongoDB Atlas connection string

const app = express();
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result: any) => {
    app.listen(port);
    console.log("LocalHost is listening to Requests.");
  })
  .catch((err) => console.log("Something happend.\n", err.toString()));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../out/views"));
app.use(express.static(path.join(__dirname, "../out/css")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.redirect("/blogs");
});

app.get("/blogs", (request, response) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result: any) => {
      response.render("index", { title: "All Blogs", blogs: result });
    })
    .catch(() =>
      response.render("404", {
        title: "404",
      })
    );
});

app.post("/blogs", (request, response) => {
  const incomingData = Blog(request.body);
  incomingData
    .save()
    .then(() => response.redirect("/blogs"))
    .catch(() =>
      response.render("404", {
        title: "404",
      })
    );
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
  });
});

app.get("/blogs/create", (request, response) => {
  response.render("create", {
    title: "Create a new Blog",
  });
});

app.get("/blogs/:id", (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result: any) => {
      response.render("details", { blog: result, title: "Full Blog" });
    })
    .catch(() => {
      response.status(404).render("404", {
        title: "404",
      });
    });
});

app.delete("/blogs/:id", (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id)
    .then((result: any) => {
      response.json({ redirect: "/blogs" });
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
});
