import express from 'express';

const api = express();

api.listen(3333, () => {
    console.log(`===> Server Started on PORT 3333 <===`);
});
