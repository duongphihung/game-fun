import { Route, Routes } from "react-router"
import GameScreenPage from "../pages/GameScreenPage"
import HomeScreenPage from "../pages/HomeScreenPage"


const DomRouter = () => {
    return (
        <Routes>
            <Route path="/game" element={<GameScreenPage />} />
            <Route path="/" element={<HomeScreenPage />} />
        </Routes>
    )
}

export default DomRouter