import { ValidateProps } from '@/api-lib/constants';
import {
  findPosts,
  findRoles,
  findUserById,
  insertPost,
  updateRoleById,
} from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import next from 'next';
import nc from 'next-connect';
const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const posts = await findRoles(req.db);

  res.json({ posts });
});

handler.use(...auths);
handler.put(async (req, res) => {
  try {
    if (!req.user) res.status(401).send('unauthorized');
    const user = await findUserById(req.db, req.user._id);
    console.log('update role user =', user);
    if (user.role.U != '1') {
      return res.status(401).json({ error: 'unauthorized update' });
    }
    let { _id, ...param } = req.body;
    const updateRole = await updateRoleById(req.db, _id, param);
    res.json({ role: updateRole });
  } catch (e) {
    res.json({ error: { message: e.message } });
  }
});

// handler.post(
//   ...auths,
//   validateBody({
//     type: 'object',
//     properties: {
//       content: ValidateProps.post.content,
//     },
//     required: ['content'],
//     additionalProperties: false,
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).end();
//     }

//     const post = await insertPost(req.db, {
//       content: req.body.content,
//       creatorId: req.user._id,
//     });

//     return res.json({ post });
//   }
// );

export default handler;
