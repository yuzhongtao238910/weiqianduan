import { BrowserRouter, Route, Link, Routes} from "react-router-dom"
import {Home} from "./components/Home"
import {About} from "./components/About"
export default function Root(props) {
  return (
    <BrowserRouter basename="/react">
      <div>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
