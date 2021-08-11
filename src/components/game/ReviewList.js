import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "./GameProvider";
import { ReviewContext } from "./ReviewProvider";

export const ReviewList = (props) => {
  const { reviews, getReviews, getReviewByGameId } = useContext(ReviewContext);
  
  const [review, setReview] = useState()

  useEffect(() => {
    getReviews();
  }, []);

  const {game_id} = useParams()

    useEffect(() => {
      getReviewByGameId(parseInt(game_id)).then((r)=>{
          setReview(r)
        })
    }, [])

  return (
    <>
      <article className="reviews">
        {review.map((r) => {
        return (
            <section key={`review--${r.id}`} className="review">
                <div className="review__name">
                    <h3>{r.review}</h3> by {r.player.bio} {r.game.title}
                </div>
            </section>
    );
  })}
      </article>
    </>
  );
};

