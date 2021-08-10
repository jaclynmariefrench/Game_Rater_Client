import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { ReviewContext } from "./ReviewProvider"


export const ReviewForm = () => {
    const history = useHistory()
    const { createReview } = useContext(ReviewContext)
    const [ game, setGame ] = useState( {} )

    const {game_id} = useParams()

    useEffect(() => {
        getGameById(parseInt(game_id)).then((game)=>{
          setGame(game)
        })
    }, [])

    const [currentReview, setCurrentReview] = useState({
        player: localStorage.getItem("lu_token"),
        game: currentReview.game,
        review: ""
    })


    const changeReviewState = (event) => {
        const newReviewState = { ...currentReview }
        newReviewState[event.target.name] = event.target.value
        setCurrentReview(newReviewState)
    }


    return (
        <form className="ReviewForm">
            <h2 className="ReviewForm__name">Register New Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">What do you think of this {game.title}: </label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>
            {/* You create the rest of the input fields for each Review property */}

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        review: currentReview.review
                    }

                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push("/games/detail/:game_id(\d+)"))
                }}
                >Submit</button>
        </form>
    )
}