import express from 'express';
import initRoutes from './initialize/init.routes';

const app = express();
initRoutes(app);

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});