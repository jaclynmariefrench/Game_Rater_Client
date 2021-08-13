import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { GameContext } from "./GameProvider"

export const GameDetail = () => {
    const { getGameById } = useContext(GameContext)
    const [ game, setGame ] = useState( {} )

    const { game_id } = useParams();
    const history = useHistory()


    useEffect(() => {
        getGameById(parseInt(game_id)).then((game)=>{
          setGame(game)
        })
    }, [])


    return (
    <section className="game">
        <h3 className="game__title">{ game.title }</h3>
        <div className="game__designer">Designer: { game.designer }</div>
        <div className="game__number_of_players">Number of Players: { game.number_of_players }</div>
        <div className="game__time_to_play">Time to Play: { game.time_to_play }</div>
        <div className="game__year_released">Year Released: { game.year_released }</div>
        <div className="game__age_recommendation">Age Recommendation: { game.age_recommendation }</div>
        <div className="game__average_rating">Game Rating: {game.average_rating} out of 10.</div>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push(`/games/${game_id}/review`);
        }}
      >
        Review
      </button>
    </section>
    )
}