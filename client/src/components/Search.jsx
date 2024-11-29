import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import Loader from "./loader";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // Get query from URL
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  useEffect(() => {
    if (!query) {
      setError("No search query provided.");
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(
      `https://news-sphere-backend.onrender.com/search?q=${query}&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch search results. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  function handlePrev() {
    setPage((prevPage) => prevPage - 1);
  }

  function handleNext() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((article, index) => (
              <Card
                key={index}
                title={article.title}
                description={article.description}
                imgUrl={article.urlToImage}
                publishedAt={article.publishedAt}
                url={article.url}
                author={article.author}
                source={article.source.name}
              />
            ))
          ) : (
            <p>No articles found for the query: {query}.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
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
