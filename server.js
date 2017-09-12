let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()


app.set('view engine', 'ejs')

//The Middleware down below
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//First session then the Middlewares
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))

//Routes
app.get('/', (request, response) => {
  let Message = require('./models/message')
  Message.all(function(messages) {
  response.render('pages/index', {messages : messages})
  })
})
app.get('/message/:id', (request, response) => {
  let Message = require('./models/message')
  Message.find(request.params.id, function (message) {
    response.render('messages/show', {message: message})
  })
})


app.post('/', (request,response) => {

  if (request.body.message === undefined ||   request.body.message === '') {

    request.flash('error', 'You didn\'t send a message')
    response.redirect('/')

  } else {

    let Message = require('./models/message')
    Message.create(request.body.message, function() {
      request.flash('success', 'Thank you !')
      response.redirect('/')
    })

  }


})

app.listen(8080)
