const { Router } = require('express');
const { readTalkerFile } = require('../utils/readAndWriteFiles'); 

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const getAll = await readTalkerFile();
  return res.status(200).json(getAll);
});

module.exports = {
  talkerRouter,
};