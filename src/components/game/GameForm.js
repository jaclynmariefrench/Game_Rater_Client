import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameCategories, gameCategories } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        time_to_play: 0,
        number_of_players: 0,
        title: "",
        designer: "",
        year_released: 0,
        age_recommendation: 0,
        categories: 0
    })


    useEffect(() => {
        getGameCategories()
    }, [])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Name of Game: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designer">Game designer:</label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                            value={currentGame.designer}
                            onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players:</label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="time_to_play">Time to play:</label>
                    <input type="number" name="time_to_play" required autoFocus className="form-control"
                        value={currentGame.time_to_play}
                        onChange={changeGameState}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released:</label>
                    <input type="number" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    ></input>
                </div> 
                <div className="form-group">
                    <label htmlFor="age_recommendation">Age recommendation:</label>
                    <input type="number" name="age_recommendation" required autoFocus className="form-control"
                        value={currentGame.age_recommendation}
                        onChange={changeGameState}
                    ></input>
                </div> 
                <div className="form-group">
                    <label htmlFor="categories">Game Category:</label>
                    <select value={currentGame.categories} name="categories" id="categories" className="form-control" onChange={changeGameState}>
                        <option value="0">Select the Game Type</option>
                        {gameCategories.map(gc=>(
                            <option key={gc.id} value={gc.id}>
                                {gc.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        designer: currentGame.designer,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        age_recommendation: parseInt(currentGame.age_recommendation),
                        categories: parseInt(currentGame.categories),
                        year_released: parseInt(currentGame.year_released),
                        time_to_play: parseInt(currentGame.time_to_play)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                >Create</button>
        </form>
    )
}