import { useRef, useEffect } from "react"
// import { startApp, destroyApp } from "wujie"
import WujieReact from "./components/wu-react";
export default function Page1() {
    return (
        <WujieReact
            name="WujieReact"
            url="http://localhost:3001"
            width="100%"
            height="100%"
        ></WujieReact>
    )
    // const myRef = useRef(null)
    //
    // let destroy = null
    //
    // const startAppFunc = async () => {
    //     destroy = await startApp({
    //         name: "react",
    //         url:"http://localhost:3001",
    //         el: myRef.current
    //     })
    // }
    //
    // useEffect(() => {
    //     startAppFunc()
    //     return () => {
    //         if (destroy) {
    //             destroyApp(destroy)
    //         }
    //     }
    // }, [])
    // return (
    //     <div ref={myRef} width={'100%'} height={'100%'}>
    //
    //     </div>
    // )
}
