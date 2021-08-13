import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { RatingContext } from "./RatingProvider"
import { GameContext } from "./GameProvider"


export const RatingForm = () => {
    const history = useHistory()
    const { createRating } = useContext(RatingContext)
    const { getGameById } = useContext(GameContext)
    const [ game, setGame ] = useState( {} )

    const {game_id} = useParams()

    useEffect(() => {
        getGameById(parseInt(game_id)).then((game)=>{
          setGame(game)
        })
    }, [])

    const [currentRating, setCurrentRating] = useState({
        game: game,
        rating: 0
    })


    const changeRatingState = (event) => {
        const newRatingState = { ...currentRating }
        newRatingState[event.target.name] = event.target.value
        setCurrentRating(newRatingState)
    }


    return (
        <form className="RatingForm">
            <h2 className="RatingForm__name">Register New Rating</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">What rating would you give {game.title}: </label>
                    {/* <input type="textarea" name="rating" required autoFocus className="form-control"
                        value={currentRating.rating}
                        onChange={changeRatingState}
                    /> */}
                    <select value={currentRating.rating} name="rating" id="rating" className="form-control" onChange={changeRatingState}>
                        <option value="0">Select rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </fieldset>
            {/* You create the rest of the input fields for each Rating property */}

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const rating = {
                        rating: currentRating.rating,
                        game: game.id
                    }

                    // Send POST request to your API
                    createRating(rating)
                        .then(() => history.push(`/games/detail/${game_id}`))
                }}
                >Submit</button>
        </form>
    )
}