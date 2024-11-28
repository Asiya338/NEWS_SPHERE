import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "./loader";
import { useParams } from "react-router-dom";

const CountryNews = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }
  let pageSize = 6;
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:5000/country/:${params.iso}?&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in loading data: " + response.statusText);
        }
        return response.json();
      })
      .then((myJson) => {
        setTotalResults(myJson.data.totalResults);
        setData(myJson.data.articles);
      })
      .catch((error) => {
        console.log(error, "error fetching data");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading regardless of success or error
      });
  }, [page, params.iso]);

  return (
    <>
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => {
              <Card
                key={index}
                title={element.title}
                description={element.description}
                author={element.author}
                source={element.source.name}
                imgUrl={element.urlToImage}
                url={element.url}
                publishedAt={element.publishedAt}
              ></Card>;
            })
          ) : (
            <p>no articles to fetch in this category....</p>
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
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default CountryNews;
