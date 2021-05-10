const express = require("express");
const app = express();
const port = 5000;
const logger = require("morgan");


app.use(logger("dev"));


app.get("/", (req, res) => {
    res.send("<h1>Hello World Abc!</h1>");
});

app.get("/movies", (req, res) => {
    res.send("<h1>Some movies</h1>");
});

app.get("/movies/:id", (req, res) => {
    console.log(req.params.id);
    res.send(`<h1>${req.params.id}</h1>`)
})

app.post("/movies", (req, res) => {
    res.send("hello world")
})

app.get("/posts", (req, res) => {
    console.log({
        query: req.query
    })
    if(req.query.order)
    {res.send(`<h1> list of posts in ${req.query.order} order</h1>`)}
    else{
        res.send("<h1>List of posts</h1>")
    }
})

app.get("/posts/:id", (req, res) => {
    console.log({
        query: req.query
    })
    res.send(`<h1>ID: ${req.params.id}</h1>`)
})

app.get("/users", (req, res) => {
    if(req.query.country)
    {
        if(req.query.birthMonth){
            res.send(`<h1> list of users whose country is  ${req.query.country} and  birth month is in  ${req.query.birthMonth} </h1>`)
        } else{
            res.send(`<h1> list of users whose country is  ${req.query.country} </h1>`)
        }
}
    else{
        if(req.query.birthMonth){
            res.send(`<h1> list of users whose birth month is in  ${req.query.birthMonth} </h1>`)
        } else{
            res.send("<h1>List of Users</h1>")
        }
    }
})

app.get("/users/:id", (req, res) => {
    res.send(`<h1> ID: ${req.params.id}</h1>`)
})



app.use((req, res, next) => {
    const error = new Error("<h1>Resource Not Found</h1>");
    error.statusCode = 404;
    next(error);
});

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.statusCode || 500);
    res.send(err.message);
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
