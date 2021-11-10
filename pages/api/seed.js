import { ValidateProps } from '@/api-lib/constants';
import {
  findUserByEmail,
  findUserByUsername,
  insertRole,
  insertUser,
  findRoleByRoleName,
} from '@/api-lib/db';
import { database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.use(database);

handler.get(
  //   validateBody({
  //     type: 'object',
  //     properties: {
  //       roleName: ValidateProps.role.roleName,
  //       C: ValidateProps.role.C,
  //       R: ValidateProps.role.R,
  //       U: ValidateProps.role.U,
  //       D: ValidateProps.role.D,
  //     },
  //     required: ['roleName', 'C', 'R', 'U', 'D'],
  //     additionalProperties: false,
  //   }),

  async (req, res) => {
    const { roleName, C, R, U, D } = {
      roleName: 'Customer',
      C: '1',
      R: '1',
      U: '1',
      D: '1',
    };

    if (await findRoleByRoleName(req.db, roleName)) {
      res
        .status(403)
        .json({ error: { message: 'The roleName has already been taken.' } });
      return;
    }
    const role = await insertRole(req.db, { roleName, C, R, U, D });
    const role2 = await insertRole(req.db, {
      roleName: 'Customer2',
      C: '1',
      R: '1',
      U: '1',
      D: '1',
    });
    const role3 = await insertRole(req.db, {
      roleName: 'Customer3',
      C: '1',
      R: '1',
      U: '1',
      D: '1',
    });
    res.json({ role });
  }
);

export default handler;
