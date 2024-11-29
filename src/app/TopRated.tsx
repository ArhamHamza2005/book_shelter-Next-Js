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

const TopRated: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State to hold the selected book

  const cardsData: Book[] = [
    {
      title: "Rich Dad Poor Dad ",
      id: "kRqeDwAAQBAJ",
      description: "In Rich Dad Poor Dad, the #1 Personal Finance book of all time, Robert Kiyosaki shares the story of his two dad: his real father and his rich dad. One was educated and an employee all his life, the other's education was street smarts over traditional classroom education and he took the path of entrepreneurship?a road that led him to become one of the wealthiest men in Hawaii. Robert's poor dad struggled financially all his life. and these two dads had varying points of view of money and investing.Rich Dad Poor Dad will?? explode the myth that you need to earn a high income to become rich? challenge the belief that your house is an asset? show parents why they can't rely on the school system to teach their kids about money define, once and for all, an asset and a liability explain the difference between good debt and bad debt? teach you to see the world of money from different perspectives discuss the shift in mindset that can put you on the road to financial freedom",
      image: "/image/rich.jpg",
      author: "Robert T. Kiyosaki",
      publisher: "Lulu.com",
    },
    {
      title: "War and Peace",
      id: "3cWhQgAACAAJ",
      description: "Backgrounds and Sourcesincludes the publication history of War and Peace, selections from Tolstoy's letters and diaries as well as three drafts of his introduction to the novel that elucidate the its evolution, and an 1868 article by Tolstoy in which he reacts to his critics.Criticism includes twenty essays, seven of them new, that provide diverse perspectives on the novel by Nikolai Strakhov, V. I. Lenin, Henry James, Isaiah Berlin, D. S. Mirsky, Kathryn Feuer, Lydia Ginzburg, Richard Gustafson, Gary Saul Morson, and Caryl Emerson, among others. A Chronology and Selected Bibliography are also included.Cancel",
      image: "/image/war.jpg",
      author: "Graf Leo Tolstoy",
      publisher: "W W Norton & Company Incorporated",
    },
    {
      title: "The Great Gatsby",
      id: "IZmVXKHD69MC",
      description: "The only edition of the beloved classic that is authorized by Fitzgerald’s family and from his lifelong publisher. This edition is the enduring original text, updated with the author’s own revisions, a foreword by his granddaughter, and with a new introduction by National Book Award winner Jesmyn Ward. The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. First published by Scribner in 1925, this quintessential novel of the Jazz Age has been acclaimed by generations of readers. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.",
      image: "/image/great.jpg",
      author: " F. Scott Fitzgerald",
      publisher: "Simon and Schuster",
    },
    {
      title: "Moby-Dick",
      id: "6bBPrgEACAAJ",
      description: "Looking for adventure and a new life, Ishmael, the story's narrator, decides to find work on a whaling boat. On arriving at the Massachusetts harbour to begin his search, the only bed available is already half occupied by a cannibal named Queequeg. Although Queequeg has limited English, a friendship forms and the two men sign up for work together aboard the Pequod under the infamous Captain Ahab.",
      image: "/image/moby.jpg",
      author: "Herman Melville",
      publisher: "Collector's Library",
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

export default TopRated;
