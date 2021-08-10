import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameCategories, setCategories ] = useState([])


    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }
    
    const getGameCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
         })
            .then(response => response.json())
            .then(setCategories)
    }

    const getGameById = (game_id) => {
        return fetch(`http://localhost:8000/games/${game_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
      }
    

    return (
        <GameContext.Provider value={{ games, getGames, createGame, getGameCategories, gameCategories, getGameById }} >
            { props.children }
        </GameContext.Provider>
    )
}