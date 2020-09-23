import { app } from './app';

const port = process.env.PORT ? process.env.PORT : 2000;

app.listen(port, () => {
  console.log(`***** SERVER STARTED ON PORT ${port} *****`);
});
