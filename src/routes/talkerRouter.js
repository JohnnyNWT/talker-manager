const { Router } = require('express');
const generateToken = require('../utils/getToken');
const { readTalkerFile, writeTalkerFile } = require('../utils/readAndWriteFiles');
const {
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
} = require('../middlewares/checkFields');
const auth = require('../middlewares/authorization');

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

talkerRouter.post('/login', (_req, res) => {
  const getToken = generateToken();
  return res.status(200).header('Authorization', getToken).json({ token: getToken });
}).post('/',
auth, verifyName, verifyAge, verifyTalk, verifyWatchedAt, verifyRate, async (req, res) => {
  const { body } = req;
  const data = await readTalkerFile();
  const newObj = {
    id: data.length += 1,
    ...body,
  };
  await writeTalkerFile(newObj);
  return res.status(201).json(newObj);
});

module.exports = talkerRouter;