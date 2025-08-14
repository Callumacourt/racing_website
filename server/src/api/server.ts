import app from './index';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));


