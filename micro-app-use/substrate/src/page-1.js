export default function Page2() {
    return (
        <div>
            react项目
            <hr/>
            {/*这个标签是通过webcomponent来实现的*/}
            <micro-app name='my-react' url='http://localhost:3001' router-mode='native'></micro-app>
        </div>
    )
}
