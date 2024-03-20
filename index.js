const express = require('express')
const redoc = require('redoc-express')
const app = express()
const verMount = express()
const apiKey = process.env.API_KEY
//const http = require('http')
const port = process.env.PORT || 3000

//routers for the 2 different clients
const customer = require('./routers/customer')
const finance = require('./routers/finance')

app.get('/banking/v1/docs/swagger.json', (req, res) => {
    res.sendFile('swagger.json', { root: './docs'})
})


app.use('/customer',customer)
console.log('Router Customer mounted')

app.use('/finance',finance)
console.log('Router Finance mounted')

app.get('/', (req, res) => {
    res.sendFile('index.html',{ root: './static'})
})

app.get('/docs/swagger.json', (req, res) => {
    res.sendFile('swagger.json', { root: './docs' });
  });
  

app.get(
    '/docs',
    redoc({
        title: 'API Docs',
        specUrl: 'swagger.json',
        nonce: '', // <= it is optional,we can omit this key and value
        // we are now start supporting the redocOptions object
        // you can omit the options object if you don't need it
        // https://redocly.com/docs/api-reference-docs/configuration/functionality/
        redocOptions: {
            theme: {
                colors: {
                    primary: {
                        main: '#6EC5AB'
                    }
                },
                typography: {
                    fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
                    fontSize: '15px',
                    lineHeight: '1.5',
                    code: {
                        code: '#87E8C7',
                        backgroundColor: '#4D4D4E'
                    }
                },
                menu: {
                    backgroundColor: '#ffffff'
                }
            }
        }
    })
);

verMount.use('/banking/v1',app)

verMount.listen(port)