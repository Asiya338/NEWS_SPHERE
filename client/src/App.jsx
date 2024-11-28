import Header from "./components/Header";
import News from "./components/News";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import Search from "./components/Search";
import FeedbackForm from "./components/FeedbackForm";
import Top from "./components/Top";
import Notes from "./components/Notes";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/all-news" element={<News />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/search" element={<Search />} />
          <Route path="/messages" element={<Notes />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>

        <Top />

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
