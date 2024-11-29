"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../Nabvabr";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  description: string;
  publisher: string;
}

async function fetchBooks(query: string): Promise<Book[]> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDjIgenXI906Gvv0gd42unQbooSln8ILg4&maxResults=40`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  const books: Book[] = data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || "Unknown Author",
    cover_image: item.volumeInfo.imageLinks?.thumbnail || "",
    description: item.volumeInfo.description || "No description available",
    publisher: item.volumeInfo.publisher || "Unknown Publisher",
  }));

  return books;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const handleSearch = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const fetchedBooks = await fetchBooks(query);
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    handleSearch("horror");
  }, []);

  return (
  <>
    <Navbar/>
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Books List</h1>

      {/* Search Bar with Button */}
      <div className="mb-6 flex gap-2 justify-center">
  <input
    type="text"
    className="w-64 p-2 border border-gray-300 rounded-md"
    placeholder="Search books by title or author"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
  />
  <button
    onClick={() => handleSearch(searchQuery)}
    className="px-3 py-2 text-sm bg-black text-white rounded hover:bg-gray-700 sm:px-4 sm:py-2 sm:text-base"
  >
    Search
  </button>
</div>


      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Grid for displaying books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-black shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              onClick={() => handleBookClick(book)}
            >
              {book.cover_image && (
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-64 object-cover cursor-pointer"
                />
              )}
              <div className="p-4">
             
                <h2 className="text-xl font-semibold text-white">
                  {book.title}
                </h2>
                <p className="text-white mt-2">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-white mt-2">
                  <strong>Id: </strong> {book.id}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-600">
            No books found. Please try a different search.
          </p>
        )}
      </div>

      {/* Modal for displaying book details */}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="text-3xl font-semibold mb-4">
              {selectedBook.title}
            </h2>
            {selectedBook.cover_image && (
              <img
                src={selectedBook.cover_image}
                alt={selectedBook.title}
                className="w-64 h-96 object-cover mb-4"
              />
            )}

            {/* Scrollable Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              <p className="text-lg mb-4">
                <strong>Author:</strong> {selectedBook.author}
              </p>
              <p className="text-lg mb-4">
                <strong>Publisher:</strong> {selectedBook.publisher}
              </p>
              <p className="text-lg mb-4">
                <strong>Description:</strong> {selectedBook.description}
              </p>
            </div>

            {/* Cancel Button */}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BooksPage;
