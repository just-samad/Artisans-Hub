import React, { useEffect, useState } from 'react';
import './CommentRating.css';
import { FaStar } from 'react-icons/fa';

const CommentRatingSection = ({ artisanId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  // Simulate fetching data from DB
  useEffect(() => {
    // Dummy comments (replace with real DB fetch)
    const dummyData = [
      { id: 1, user: 'John', text: 'Great work!', rating: 5 },
      { id: 2, user: 'Ada', text: 'Skilled artisan. Recommend.', rating: 4 },
    ];
    setComments(dummyData);

    // Calculate average rating
    const avg =
      dummyData.reduce((acc, val) => acc + val.rating, 0) / dummyData.length;
    setAverageRating(avg.toFixed(1));
  }, [artisanId]);

  const handleCommentSubmit = () => {
    if (!commentInput || rating < 1) return;

    const newComment = {
      id: Date.now(),
      user: 'You',
      text: commentInput,
      rating,
    };

    setComments((prev) => [newComment, ...prev]);
    setAverageRating(
      (
        ([...comments, newComment].reduce((acc, val) => acc + val.rating, 0)) /
        ([...comments, newComment].length)
      ).toFixed(1)
    );

    // Reset form
    setCommentInput('');
    setRating(0);
    setHovered(null);

    // TODO: Push to DB (e.g., Firebase)
  };

  return (
    <div className="comment-rating-container">
      <h3>Comments & Ratings</h3>
      <div className="rating-summary">
        ⭐ Average Rating: <strong>{averageRating} / 5</strong> ({comments.length} reviews)
      </div>

      <div className="comment-form">
        <textarea
          placeholder="Leave a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={24}
                className="star"
                color={
                  starValue <= (hovered || rating) ? '#ffc107' : '#e4e5e9'
                }
                onMouseEnter={() => setHovered(starValue)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setRating(starValue)}
              />
            );
          })}
        </div>
        <button onClick={handleCommentSubmit} className="btn-primary">
          Submit
        </button>
      </div>

      <div className="comment-list">
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <strong>{comment.user}</strong>
            <p>{comment.text}</p>
            <div className="comment-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  color={i < comment.rating ? '#ffc107' : '#e4e5e9'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentRatingSection;
