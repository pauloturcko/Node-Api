import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
        res.json({
            Status: 'success',
        });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Application started on port 3000");
});