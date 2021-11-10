import { ValidateProps } from '@/api-lib/constants';
import { findPosts, findRoles, insertPost, updateRoleById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const posts = await findRoles(req.db);

  res.json({ posts });
});

handler.put(async (req, res) => {
  let { _id, ...param } = req.body;
  const updateRole = await updateRoleById(req.db, _id, param);
  res.json({ role: updateRole });
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
