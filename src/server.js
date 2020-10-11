const app = require('./app')
const port = process.env.port || 3333

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})