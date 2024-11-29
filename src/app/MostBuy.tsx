"use client";
import React, { useState } from 'react';

// Define types for the Card component props
interface CardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  onClick: () => void; // onClick is a function that does not return anything
}

// Card component
const Card: React.FC<CardProps> = ({ id, title, author, description, image, onClick }) => {
  return (
    <div
      className="bg-black text-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick} // Trigger the onClick handler to show the modal
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-white"><strong>Author: </strong>{author}</p>
        <p className="text-white"><strong>Id: </strong>{id}</p>
      </div>
    </div>
  );
};

// Define types for the book object
interface Book {
  title: string;
  id: string;
  description: string;
  image: string;
  author: string;
  publisher: string;
}

const MostBuy: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State to hold the selected book

  const cardsData: Book[] = [
    {
      title: "Harry Potter",
      id: "JHEkAQAAMAAJ",
      description: "The final adventure in J.K. Rowling's phenomenal, best-selling Harry Potter book seriesProvided by publisher.",
      image: "/image/harry.jpg",
      author: "J. K. Rowling",
      publisher: "Harper Collins and Houghton Mifflin",
    },
    {
      title: "The Lord of the Rings",
      id: "1UETU2h-AoC",
      description: "A beautiful illustrated boxed set collecting the two most popular Tolkien hardbacks...",
      image: "/image/lord.jpg",
      author: "John Ronald Reuel Tolkien",
      publisher: " HarperCollins and Houghton Mifflin",
    },
    {
      title: "Don Quixote",
      id: "IZmVXKHD69MC",
      description: "The classic Spanish tale of humorous chivalry...",
      image: "/image/quote.jpg",
      author: "Miguel de Cervantes",
      publisher: "The Russian Messenger",
    },
    {
      title: "The Alchemist",
      id: "6bBPrgEACAAJ",
      description: "A global phenomenon, The Alchemist has been read and loved by over 62 million readers...",
      image: "/image/chemist.jpg",
      author: "Paulo Coelho",
      publisher: "HarperCollins publishers",
    }
  ];

  const handleCardClick = (book: Book) => {
    setSelectedBook(book); // Set the selected book when a card is clicked
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Close the modal by setting the selectedBook to null
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Most Buying Books</h1>
      
      {/* Grid for displaying cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            description={card.description} 
            image={card.image} 
            id={card.id} 
            author={card.author} 
            onClick={() => handleCardClick(card)} // Pass the card data to the handler
          />
        ))}
      </div>

      {/* Modal for displaying selected book details */}
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
            <h2 className="text-3xl font-semibold mb-4">{selectedBook.title}</h2>
            {selectedBook.image && (
              <img
                src={selectedBook.image}
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
  );
};

export default MostBuy;
