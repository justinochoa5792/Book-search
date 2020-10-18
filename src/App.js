import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [books, setBooks] = useState([]);

  function handleChange(e) {
    setTerm(e.target.value);
  }

  async function renderBooks() {
    const response = await Axios.get(
      `http://openlibrary.org/search.json?q=${term}`
    );
    console.log(response.data.docs);
    setBooks(response.data.docs);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    renderBooks();
  };

  return (
    <div className="home">
      <header className="header">
        <h2>Book Search</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Book Title"
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </header>
      {books.map((eachBook) => {
        return (
          <ul>
            <li>
              <h3>Book Title: </h3>
              {eachBook.title}
            </li>
            <li>
              <h3>Author: </h3>
              {eachBook.author_name}
            </li>
            <li>
              <h3>Year Published: </h3>
              {eachBook.first_publish_year}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
