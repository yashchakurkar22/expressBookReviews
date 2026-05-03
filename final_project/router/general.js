const express = require("express");
const books = require("./booksdb.js");

const general = express.Router();

// Helper function for Task 10: Get all books using Promise
const getBookList = () => {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
};

// GET ALL BOOKS (Task 10)
general.get("/", (req, res) => {
    getBookList()
        .then((bookList) => res.json(bookList))
        .catch((err) => res.status(500).json({ message: "Error fetching books" }));
});

// Helper function for Task 11: Get book by ISBN using Promise
const getFromISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject({ message: "Book not found" });
        }
    });
};

// GET BY ISBN (Task 11)
general.get("/isbn/:isbn", (req, res) => {
    getFromISBN(req.params.isbn)
        .then((book) => res.json(book))
        .catch((err) => res.status(404).json(err));
});

// Helper function for Task 12: Get books by Author using Promise
const getFromAuthor = (author) => {
    return new Promise((resolve) => {
        const filteredBooks = Object.values(books).filter(b => b.author === author);
        resolve(filteredBooks);
    });
};

// GET BY AUTHOR (Task 12)
general.get("/author/:author", (req, res) => {
    getFromAuthor(req.params.author)
        .then((booksByAuthor) => res.json(booksByAuthor));
});

// Helper function for Task 13: Get books by Title using Promise
const getFromTitle = (title) => {
    return new Promise((resolve) => {
        const filteredBooks = Object.values(books).filter(b => b.title === title);
        resolve(filteredBooks);
    });
};

// GET BY TITLE (Task 13)
general.get("/title/:title", (req, res) => {
    getFromTitle(req.params.title)
        .then((booksByTitle) => res.json(booksByTitle));
});

// GET REVIEWS
general.get("/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];
    return res.json(book?.reviews || {});
});

module.exports.general = general;
