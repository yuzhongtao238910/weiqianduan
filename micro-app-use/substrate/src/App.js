import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import Page1 from  "./page-1"
import Page2 from  "./page-2"
// 接入成本很低
function App() {
  return (
    <div className="App">
<BrowserRouter>
  <Link to="/react">react应用</Link>
  <Link to="/vue">vue应用</Link>
  <Routes>
    <Route path="/react/*" element={<Page1></Page1>}></Route>
    <Route path="/vue/*" element={<Page2></Page2>}></Route>
  </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
