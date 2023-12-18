
const express = require('express')
const app = express()
const port = 3024

app.get('/', (req, res) => {
  res.send('¡Hola mundo de Express!')
})

app.listen(port, () => {
  console.log(`Aplicación de ejemplo corriendo en el puerto ${port}`)
})
