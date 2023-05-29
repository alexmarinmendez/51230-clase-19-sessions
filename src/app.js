import express from 'express'
import session from 'express-session'

const app = express()

app.use(session({
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    console.log(req.session)
    res.send('ok')
})

app.get('/login', (req, res) => {
    const { username } = req.query
    if (username == '') return res.send('Need a username')
    req.session.user = username
    console.log(req.session)
    res.send('Login success!')
})

app.get('/logout', (req, res) => { 
    req.session.destroy(err => res.send(err))
    console.log(req.session)
    res.send('Logout success!')
})

app.get('/private', (req, res) => {
    console.log(req.session)
    if (req.session.user && req.session.user==='alex') return res.send('Private page!')
    res.send('No Permissions')
})

app.listen(8080, () => console.log('Server UP'))
