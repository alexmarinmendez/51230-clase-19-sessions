import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'

const app = express()
const fileStore = FileStore(session)

app.use(session({
    store: new fileStore({
        path: './sessions',
        ttl: 120,
        retries: 2
    }),
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/login', (req, res) => {
    const { username } = req.query
    if (username == '') return res.send('Need a username')
    req.session.user = username
    res.send('Login success!')
})

app.get('/logout', (req, res) => { 
    req.session.destroy(err => console.log(err))
    res.send('Logout success!')
})

app.get('/private', (req, res) => {
    if (req.session.user && req.session.user==='alex') return res.send('Private page!')
    res.send('No Permissions')
})

app.listen(8080, () => console.log('Server UP'))
