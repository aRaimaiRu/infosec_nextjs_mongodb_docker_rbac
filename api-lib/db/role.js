import { ObjectId } from 'mongodb';
//insertRole
export async function insertRole(db, { roleName, C, R, U, D }) {
  const role = {
    roleName,
    C,
    R,
    U,
    D,
  };
  const { insertedId } = await db.collection('roles').insertOne(role);
  role._id = insertedId;
  return role;
}
//findrolebyID
export async function findRoleById(db, id) {
  const roles = await db
    .collection('roles')
    .aggregate([{ $match: { _id: new ObjectId(id) } }, { $limit: 1 }])
    .toArray();
  if (!roles[0]) return null;
  return roles[0];
}
//findbyRoleName
export async function findRoleByRoleName(db, roleName) {
  const roles = await db
    .collection('roles')
    .aggregate([{ $match: { roleName } }, { $limit: 1 }])
    .toArray();
  if (!roles[0]) return null;
  return roles[0];
}

//findroles
export async function findRoles(db) {
  return db.collection('roles').find({}).toArray();
}
//updaterole
export async function updateRoleById(db, id, data) {
  console.log('find and update', id, data);
  return db
    .collection('roles')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )
    .then(({ value }) => value);
}
//deleterole
