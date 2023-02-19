// seed.js will be run by the script `npm run seed`

// this will seed our databse with a buncha courts

// we can modify this later after building out our API a little bit.

const mongoose = require('mongoose')
const Court = require('./court')
const db = require('../../config/db')

const startCourts = [
    {name: 'ABC', location: '47 CoolTown St', longitude: -72, latitude: 46, numberOfHoops: 4, numberOfCourts: 2,},    
    {name: 'DEF', location: '29 Ballercentral Ave', longitude: -74, latitude: 43, numberOfHoops: 2, numberOfCourts: 1,},
    {name: 'GHI', location: '1 Penn Road', longitude: -71, latitude: 44, numberOfHoops: 12, numberOfCourts: 6,},
    {name: 'JKL', location: 'Alley Lane', longitude: -71.5, latitude: 45.6, numberOfHoops: 1, numberOfCourts: 1,}    
]

// first we connect to the db
// then remove all courts
// then add the start courts
// and always close the connection, whether its a success or failure

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Court.deleteMany()
            .then(deletedCourts => {
                console.log('the deleted courts:', deletedCourts)
                // now we add our courts to the db
                Court.create(startCourts)
                    .then(newCourts => {
                        console.log('the new courts', newCourts)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })