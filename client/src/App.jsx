import { BrowserRouter , Routes , Route } from "react-router-dom";
import BoardDetails from "./pages/BoardDetails";
import Boards from "./pages/Boards";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Boards/>}/>
      <Route path="/board/:boardId" element={<BoardDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
