const axios = require('axios')
const coinModel = require('../models/coinCapModel')

let getCryptoCurrency = async function (req, res) {

    try{

    const apiKey = '174876a0-5488-408b-b70c-cbfc24b6b1d6'

    let options = {
        method: 'get',
        headers: {
            Authorization : `Bearer ${apiKey}`
        },
        url: 'https://api.coincap.io/v2/assets'
    }

    let result = await axios(options)

    let data = result.data.data

    let updates = data.map(element => {
        return {
            updateOne : {
            filter : { name: element.name },
            update : { $set: { name : element.name , symbol : element.symbol , marketCapUsd : element.marketCapUsd , priceUsd : element.priceUsd } },
            upsert : true
        }
        }
    })

    await coinModel.bulkWrite(updates)

    let sortedCoins = data.sort((a, b) => b['changePercent24Hr'] - a['changePercent24Hr'])

    res.status(201).send({ status : true , message : sortedCoins })

} catch (err) {
        res.status(500).send({ message : err.message })
    }
}

module.exports = { getCryptoCurrency }