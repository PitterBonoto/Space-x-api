const express = require('express')
const uuid = require('uuid')
const cors = require('cors')


const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

const addresses = []




const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = addresses.findIndex(address => address.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Address not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}




const methodUrl = (request, response, next) => {
    console.log(request.method, request.url)

    next()
}





app.get('/addresses', methodUrl, (request, response) => {
    return response.json(addresses)
})





app.post('/addresses', methodUrl, (request, response) => {
    const { name, cep, street, number, district, city, uf, planet } = request.body

    const newAddresses = { id: uuid.v4(), name, cep, street, number, district, city, uf, planet }

    addresses.push(newAddresses)

    return response.status(201).json(newAddresses)
})





app.put('/addresses/:id', checkUserId, methodUrl, (request, response) => {

    const { name, cep, street, number, district, city, uf, planet  } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateAddress = { id: uuid.v4(), name, cep, street, number, district, city, uf, planet  }
    
    addresses[index] = updateAddress

    return response.json(updateAddress)

})





app.get('/addresses/:id', checkUserId, methodUrl, (request, response) => {

    const index = request.userIndex

    const searchAddress = addresses[index]
    return response.json(searchAddress)

})





app.delete('/addresses/:id', checkUserId, methodUrl, (request, response) => {

    const index = request.userIndex

    addresses.splice(index, 1)
    return response.status(204).json()

})





app.listen(port, () => {
    console.log(`🛜  Server starded on port ${port}`)
})