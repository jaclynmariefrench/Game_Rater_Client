import React, { useState } from "react"

export const RatingContext = React.createContext()

export const RatingProvider = (props) => {
    const [ ratings, setRatings ] = useState([])
    


    const getRatings = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setRatings)
    }

    const createRating = (rating) => {
        return fetch("http://localhost:8000/gameratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }
    


    return (
        <RatingContext.Provider value={{ ratings, getRatings, createRating, setRatings}} >
            { props.children }
        </RatingContext.Provider>
    )
}