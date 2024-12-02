
import express from 'express';
import cors from 'cors';
const env = require('dotenv').config({ debug: process.env.DEBUG })
const AccountRouter = require('./src/router/AccountRouter')
const app = express();
const port = process.env.PORT || 3000;


// Parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



///// Account //////
app.use('/api/account', AccountRouter)




app.get('/', (req, res) => {
    res.send('Hello World! Happy new day and July 13 2024')
})






const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  
});


// Improved graceful shutdown
function gracefulShutdown() {
  server.close(() => {
      console.log('\nExpress server closed');
      // Ensure the queue stops before exiting the process
      process.exit(0)
  });
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);



