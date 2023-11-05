import { error } from 'console';
import app from './app';
import dotnev from 'dotenv';
dotnev.config();
import { errors } from 'celebrate';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(errors());
