import express, { json, urlencoded } from 'express';
import cors from 'cors';

const port = process.env.SERVE_PORT;
const serveConsult = process.env.SERVE_CONSULT

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.listen(port, async function () {
  console.log('🚀🚀🤖 servidor em execução 🤖🚀🚀');
  console.log(`🚀🚀🤖 ${serveConsult}${port} 🤖🚀🚀`);
});
