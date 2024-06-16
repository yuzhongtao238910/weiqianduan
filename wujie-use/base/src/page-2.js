import WujieReact from "./components/wu-react";

export default function Page1() {
    return (
        <WujieReact
            name="WujieVue"
            url="http://localhost:8080"
            width="100%"
            height="100%"
            sync={true}
        ></WujieReact>
    )
}
