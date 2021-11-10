import { ValidateProps } from '@/api-lib/constants';
import { findPosts, findRoles, insertPost } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const posts = await findRoles(req.db);

  res.json({ posts });
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
