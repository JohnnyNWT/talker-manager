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

talkerRouter.put('/:id',
auth, verifyName, verifyAge, verifyTalk, verifyWatchedAt, verifyRate, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const data = await readTalkerFile();
  const obj = data.find((e) => e.id === Number(id));
  if (!obj) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  obj.name = body.name;
  obj.age = body.age;
  obj.talk.watchedAt = body.talk.watchedAt;
  obj.talk.rate = body.talk.rate;

  await writeTalkerFile(obj);

  return res.status(200).json(obj);
});

talkerRouter.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const data = await readTalkerFile();
  data.splice(id - 1, 1);
  await writeTalkerFile(data);
  return res.status(204).end();
});

module.exports = talkerRouter;