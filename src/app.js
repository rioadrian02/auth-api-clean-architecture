import 'dotenv/config';
import createServer from './Infrastructures/http/server.js';

const app = createServer();
const PORT  =  process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});