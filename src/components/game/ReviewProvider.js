import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [ reviews, setReviews ] = useState([])
    const [ reviewCategories, setCategories ] = useState([])


    const getReviews = () => {
        return fetch("http://localhost:8000/gamereviews", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
    }

    const createreview = (review) => {
        return fetch("http://localhost:8000/gamereviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(review)
        })
            .then(getReviews)
    }
    

    const getReviewById = (review_id) => {
        return fetch(`http://localhost:8000/gamereviews/${review_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
      }
    

    return (
        <reviewContext.Provider value={{ reviews, getReviews, createReview, getReviewCategories, reviewCategories, getReviewById }} >
            { props.children }
        </reviewContext.Provider>
    )
}