/*import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./loader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/search?q=${query}&page=${page}&pageSize=${pageSize}`
        );
        console.log(response.data);
        if (response.data.success) {
          setResults(response.data.data.articles || []);
          setTotalResults(response.data.data.totalResults || 10);
        } else {
          setError(response.data.message || "No results found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center space-x-2 mb-4"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for news..."
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!loading && results.length > 0
          ? results.map(({ article, index }) => (
              <Card
                key={index}
                title={article.title}
                description={article.description}
                imgUrl={article.urlToImage}
                publishedAt={article.publishedAt}
                author={article.author}
                source={article.source.name}
                url={article.url}
              />
            ))
          : !loading && <p>No articles found.</p>}
      </div>
      {!loading && results.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
*/

import React, { useState, useEffect } from "react";

import Card from "./Card";
import Loader from "./loader";
import axios from "axios";
function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6;

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/search?q=${query}&page=${page}&pageSize=${pageSize}`
        );
        console.log(response.data);
        if (response.data.success) {
          setData(response.data.data.articles || []);
          setTotalResults(response.data.data.totalResults || 10);
        } else {
          setError(response.data.message || "No results found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);
  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {!loading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <Card
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p className="m-100">
              <br />
              <br />
              <br />
              No articles found for this category or criteria.
            </p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!loading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
