import { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/feedback", {
        name,
        email,
        feedback,
      });
      if (response.data.success) {
        setSuccessMessage("Feedback sent successfully!");
        setName("");
        setEmail("");
        setFeedback("");
      }
    } catch (error) {
      setErrorMessage("Failed to send feedback. Please try again.", error);
    }
  };

  return (
    <div className=" shadow-lg rounded-lg p-6 sm:p-2 mx-auto  w-80 max-w-md sm:w-50 mt-20">
      <h2 className="text-2xl font-bold text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="m-4">
        <div className="mb-4">
          <label className="block mb-2">Name: *</label>
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email: *</label>
          <input
            type="email"
            placeholder="enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Feedback: *</label>
          <textarea
            value={feedback}
            placeholder="your feedback is more valuable for us ....."
            onChange={(e) => setFeedback(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full resize-none"
            required
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="font-bold py-2 px-4 rounded w-full bg-blue-500 text-white button"
        >
          Submit Feedback
        </button>
      </form>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default FeedbackForm;
