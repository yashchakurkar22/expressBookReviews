const express = require("express");
const books = require("./booksdb.js");

const general = express.Router();

// ✅ IMPORTANT: This must be defined
general.get("/", (req, res) => {
    return res.json(books);
});

// GET BY ISBN
general.get("/isbn/:isbn", (req, res) => {
    return res.json(books[req.params.isbn] || { message: "Book not found" });
});

// GET BY AUTHOR
general.get("/author/:author", (req, res) => {
    const filtered = Object.values(books).filter(b => b.author === req.params.author);
    return res.json(filtered);
});

// GET BY TITLE
general.get("/title/:title", (req, res) => {
    const filtered = Object.values(books).filter(b => b.title === req.params.title);
    return res.json(filtered);
});

// GET REVIEWS
general.get("/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];
    return res.json(book?.reviews || {});
});

module.exports.general = general;
