const express = require("express")

const app = express()

app.use(express.static(__dirname + '/signle-spa-demo'))

app.listen(9090, () => {
	console.log('success')
})