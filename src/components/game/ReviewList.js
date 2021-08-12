import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "./GameProvider";
import { ReviewContext } from "./ReviewProvider";

export const ReviewList = (props) => {
  const { reviews, getReviewByGameId } = useContext(ReviewContext);
  

  const {game_id} = useParams()

    useEffect(() => {
      getReviewByGameId(parseInt(game_id))
    }, [])

  return (
    <>
      <article className="reviews">
        {reviews?.map((r) => {
        return (
            <section key={`review--${r.id}`} className="review">
                <div className="review__name">
                    <h3>{r.review}</h3> by {r.player.bio}
                </div>
            </section>
    );
  })}
      </article>
    </>
  );
};

