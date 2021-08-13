import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { GameForm } from "./game/GameForm"
import { GameDetail } from "./game/GameDetails"
import { ReviewForm } from "./game/ReviewForm"
import { ReviewProvider } from "./game/ReviewProvider"
import { ReviewList } from "./game/ReviewList"
import { RatingForm } from "./game/RatingForm"
import { RatingProvider } from "./game/RatingProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <ReviewProvider>
                    <RatingProvider>
                        <Route exact path="/games">
                            <GameList/>
                        </Route>
                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>
                        <Route exact path="/games/detail/:game_id(\d+)">
                            <GameDetail />
                            <ReviewList/>
                        </Route>
                        <Route exact path="/games/:game_id(\d+)/review">
                            <RatingForm/>
                            <ReviewForm/>
                        </Route>
                    </RatingProvider>
                </ReviewProvider>
            </GameProvider>

        </main>
    </>
}