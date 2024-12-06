import { useState } from "react";
import { AddFeedbackAPI } from "@/app/api/ApiConfig/api";

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string | null; // Added claimId prop
}

const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose, claimId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track error messages
  const [success, setSuccess] = useState<boolean>(false); // To show success message

  const handleRatingClick = (value: number) => {
    setRating(value);
    setError(null); // Clear error when a rating is selected
  };

  const handleSubmit = async () => {
    if (!claimId) {
      setError("Claim ID is missing! Please try again.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      await AddFeedbackAPI({
        claimId,
        score: rating,
        comments: comment,
      });

      setSuccess(true); // Show success message
      setTimeout(() => {
        onClose(); // Close dialog after a short delay
        setSuccess(false); // Reset success state
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting feedback.");
    } finally {
      setLoading(false); // End loading
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4 text-center">Submit Your Feedback</h3>

        {/* Star Rating Section */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`text-4xl ${star <= rating ? "text-yellow-500" : "text-gray-400"} mx-2`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment Textbox */}
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-2"
            placeholder="Write your comment here..."
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm mb-4">Feedback submitted successfully!</p>}

        {/* Submit and Close Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded-lg px-4 py-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
