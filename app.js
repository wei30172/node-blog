const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// experss app
const app = express()

// connect to mongodb & listen for requests
// TODO: const dbURI  = 'mongodb+srv://[username]:[password]@nodeblog.zjukp.mongodb.net/[database-name]?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000)) // listen for requests
  .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs')
// app.set('views', '[other folder]') // default views

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // get req.body data
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')

  // res.render('index', { title: 'Home', blogs})
  // res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About'})
})

// blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404'})
})
