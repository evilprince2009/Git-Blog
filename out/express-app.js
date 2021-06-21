"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var Blog = require("./models/blog");
// Use your OWN credentials here
var port = 5700; // Your custom port
var connectionString = "mongodb+srv://username:password@express-app.eljla.mongodb.net/express-app?retryWrites=true&w=majority"; // Your MongoDB Atlas connection string
var app = express_1.default();
mongoose_1.default
    .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(function (result) {
    app.listen(port);
    console.log("LocalHost is listening to Requests.");
})
    .catch(function (err) { return console.log("Something happend.\n", err.toString()); });
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../out/views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../out/css")));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (request, response) {
    response.redirect("/blogs");
});
app.get("/blogs", function (request, response) {
    Blog.find()
        .sort({ createdAt: -1 })
        .then(function (result) {
        response.render("index", { title: "All Blogs", blogs: result });
    })
        .catch(function () {
        return response.render("404", {
            title: "404",
        });
    });
});
app.post("/blogs", function (request, response) {
    var incomingData = Blog(request.body);
    incomingData
        .save()
        .then(function () { return response.redirect("/blogs"); })
        .catch(function () {
        return response.render("404", {
            title: "404",
        });
    });
});
app.get("/about", function (request, response) {
    response.render("about", {
        title: "About",
    });
});
app.get("/blogs/create", function (request, response) {
    response.render("create", {
        title: "Create a new Blog",
    });
});
app.get("/blogs/:id", function (request, response) {
    var id = request.params.id;
    Blog.findById(id)
        .then(function (result) {
        response.render("details", { blog: result, title: "Full Blog" });
    })
        .catch(function () {
        response.status(404).render("404", {
            title: "404",
        });
    });
});
app.delete("/blogs/:id", function (request, response) {
    var id = request.params.id;
    Blog.findByIdAndDelete(id)
        .then(function (result) {
        response.json({ redirect: "/blogs" });
    })
        .catch(function (err) {
        console.log(err);
    });
});
app.use(function (request, response) {
    response.status(404).render("404", { title: "404" });
});
