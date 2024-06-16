
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Page1 from "./page-1"
import Page2 from "./page-2"
function Base() {
    return (
        <div>base</div>
    )
}
function App() {
  return (
    <div className="App">

      <BrowserRouter>
          <Link to="/"> ㊗️子应用</Link>
          <Link to="/react"> react子应用</Link>
          <Link to="/vue"> vue子应用</Link>
          <Routes>
              <Route element={<Base></Base>} path="/"></Route>
              <Route element={<Page1></Page1>} path="/react"></Route>
              <Route element={<Page2></Page2>} path="/vue"></Route>
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
