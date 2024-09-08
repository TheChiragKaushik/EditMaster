import { useEffect, useState } from "react";
import { searchImages } from "../api/pexelsAPI";
import Canvas from "./Canvas/Canvas.jsx";
import Modal from "./Modal.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesResult = await searchImages("cars", 1);
        setImages(imagesResult);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    try {
      const imagesResult = await searchImages(query, 1);
      setImages(imagesResult);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const imagesResult = await searchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...imagesResult]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageURL) => {
    setSelectedImage(imageURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e); // Call handleSubmit on Enter key press
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg flex items-center mb-8">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Add onKeyDown event handler
          placeholder="Search images..."
          className="w-full p-3 text-lg bg-gray-800 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
        />
        <button
          onClick={handleSubmit}
          className="ml-4 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {loading && (
          <p className="text-center col-span-3 text-white text-lg">
            Loading images...
          </p>
        )}
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
            >
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full"
                  onClick={() => openModal(image.webformatURL)}
                >
                  Add Captions
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-300 text-lg">
            Search for images...
          </p>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreImages}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Canvas imageURL={selectedImage} />
        </Modal>
      )}
    </div>
  );
};

export default Search;
