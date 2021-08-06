import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);

  const history = useHistory()

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <header>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/games/new" });
          }}
        >
          Register New Game
        </button>
      </header>
      <article className="games">
        {games.map((game) => {
          return (
            <section key={`game--${game.id}`} className="game">
              <div className="game__name">
                <h3>{game.title}</h3> by {game.designer}
              </div>
              <div className="game__players">
                {game.number_of_players} players needed
              </div>
              <div className="game__time_to_play">It takes {game.time_to_play} to play thru.</div>
            </section>
          );
        })}
      </article>
    </>
  );
};