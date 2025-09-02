import { BrowserRouter } from "react-router"
import DomRouter from "./routes/DomRouter"

function App() {
  return (
    <BrowserRouter>
      <DomRouter />
    </BrowserRouter>
  )
}

export default App
