import { BrowserRouter, Link} from "react-router-dom"
// import './App.css';
import {createRef, useEffect, useRef} from "react";
import {
    loadMicroApp
} from "qiankun"

// keep-alive 动态加载
function App() {
    const containerRef = useRef()
    useEffect(() => {
        // 手动加载
        loadMicroApp({
            name: "m-static",
            entry: "//localhost:30000",
            container:containerRef.current
        })
    }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/react">react-project</Link>
          <hr/>
        <Link to="/vue">vue-project</Link>
      </BrowserRouter>
        <div ref={containerRef}></div>
      <div id="container"></div>
    </div>
  );
}

export default App;
