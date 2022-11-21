
import './App.css'
import {BrowserRouter} from "react-router-dom";
import MainLayouts from "./components/MainLayouts";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <MainLayouts />
      </BrowserRouter>
    </div>
  )
}

export default App
