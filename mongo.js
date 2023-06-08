require('dotenv').config()
const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 'mongodb+srv://aaroylimaula:' + password + '@phonebook.loa039d.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 3){
    Person.find({}).then(result => {
        console.log('Phonebook: ')
        result.forEach(n => {
            console.log(n.name + ' ' + n.number)
        })
        mongoose.connection.close()
    })
}else if(process.argv.length == 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log('Number saved!')
        mongoose.connection.close()
    })
}else{
    process.exit(1)
}



