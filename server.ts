
import app from './src/router/AccountRouter';
const env = require('dotenv').config({ debug: process.env.DEBUG })
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});





