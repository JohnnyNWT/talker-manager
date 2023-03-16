const { Router } = require('express');
const generateToken = require('../utils/getToken');
const { readTalkerFile } = require('../utils/readAndWriteFiles'); 

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const getAll = await readTalkerFile();
  return res.status(200).json(getAll);
}).get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerFile();
  const getById = talkers.filter(({ id: idTalker }) => idTalker === Number(id));
  if (getById.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(getById[0]);
});

talkerRouter.post('/', (_req, res) => {
  const getToken = generateToken();
  return res.status(200).json({ token: getToken });
});

module.exports = {
  talkerRouter,
};