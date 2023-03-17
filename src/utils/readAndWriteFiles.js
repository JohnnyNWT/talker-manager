const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const arrayPosts = await fs.readFile('src/talker.json', 'utf8');

    return JSON.parse(arrayPosts);
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};

const writeTalkerFile = async (post) => {
  try {
    // const arrayPosts = await readTalkerFile();
    // arrayPosts.push(post);

    return await fs.writeFile('src/talker.json', JSON.stringify([post], null, 2));
  } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
  }
};

// const changeBlogPostFile = async (post, id) => {
//   try {
//     const arrayPosts = await readTalkerFile();

//     const postToUpdate = arrayPosts.filter(post.id === Number(id));
//     postToUpdate = {
//       postToUpdate,
//       ...post
//     }

//     await fs.writeFile('', JSON.stringify(arrayPosts, null, 2));
//     return postToUpdate;
//   } catch (error) {
//     return null;
//   }
// };

module.exports = {
  readTalkerFile,
  writeTalkerFile,
};