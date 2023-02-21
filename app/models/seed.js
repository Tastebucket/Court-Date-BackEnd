// seed.js will be run by the script `npm run seed`

// this will seed our databse with a buncha courts

// we can modify this later after building out our API a little bit.

const mongoose = require('mongoose')
const Court = require('./court')
const db = require('../../config/db')

const startCourts = [
    {name: 'The Little Court that Could', location: '47 CoolTown St', longitude: -75.126, latitude: 39.71, numberOfHoops: 1, numberOfCourts: .5, picture:['http://www.miamitownship.com/ImageRepository/Document?documentID=254']},    
    {name: 'Not Another Teen Court', location: '29 Ballercentral Ave', longitude: -74, latitude: 43, numberOfHoops: 2, numberOfCourts: 1,},
    {name: 'Madison Square Garden', location: '4 Pennsylvania Plaza', surface:'hardwood', longitude: -73.9936, latitude: 40.7504, numberOfHoops: 2, numberOfCourts: 1, cost: 200, picture: ['https://skift.com/wp-content/uploads/2014/04/4905954113_696c93430c_b.jpg']},
    {name: 'Cemetery Courts', location: '45 Tombstone Way', longitude: -73.914, surface:'rubber', latitude: 40.737, numberOfHoops: 1, numberOfCourts: 1, picture:['https://cdn-west.sqhk.co/2020newsportcourt/2020/6/BtihtGj/MarshallWhiteCenter.JPG']},    
    {name: 'The Supreme Court', location: '1 First St NE, Washington, DC 20543', longitude: -77.005, latitude: 38.8906, numberOfHoops: 0, numberOfCourts: 1, cost: 0, picture:['https://static01.nyt.com/images/2023/02/20/multimedia/20dc-facebook-messages-zktm/20dc-facebook-messages-zktm-jumbo.jpg?quality=75&auto=webp']},
    {name: 'Episcopal High School', location: '11 School Way', longitude: -77.096, latitude: 38.825, surface: 'hardwood', numberOfHoops: 6, numberOfCourts: 1, picture:['https://sportsurfaces.com/wp-content/uploads/2021/08/Few-Things-You-Should-Know-About-School-Basketball-Courts.jpg']},
    {name: 'Wheeler School', location: '216 Hope St, Providence, RI 02906', longitude: -71.397, latitude: 41.828, numberOfHoops: 2, numberOfCourts: 1, picture:['https://live.staticflickr.com/3668/13874069044_792448fd50_b.jpg']},    
    {name: 'Lincoln Park Courts', location: '77 Marsupial Avenue', longitude: -77.364, latitude: 38.8507, numberOfHoops: 1, numberOfCourts: 1, picture:['https://www.arlingtonva.us/files/sharedassets/public/parks/images/basketball-courts/towers-park.jpeg']},    
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