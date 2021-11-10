import React, { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetch';
import useSWR, { mutate } from 'swr';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const updateCRUD = async (body) => {
  try {
    const response = await fetcher('/api/roles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body }),
    });
    toast.success('success');
  } catch (e) {
    toast.error('can not update');
  }
  return;
};

function Mytable({ posts, user, mutate }) {
  const [data, setData] = useState(posts);
  useEffect(() => {
    setData(posts);
  }, [mutate, posts]);
  const handleChange = (changeTo, ind, key) => {
    setData((prevState) =>
      prevState.map((s, i) => (i == ind ? { ...s, [key]: changeTo } : s))
    );
  };
  console.log(posts);
  if (posts.filter((c) => c.roleName === user?.role?.roleName)[0].R != '1')
    return <div>Your can't access role table</div>;
  return (
    <div>
      <h1>Your roleName :{user.role.roleName}</h1>
      <p> 1 = permit </p>
      <table className="table table-dark">
        <thead>
          <tr>
            {Object.keys(posts[0]).map((h, k) => (
              <th key={k + 'th'}>{h}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'roleName')}
                  value={data[i]['roleName']}
                  minLength="1"
                  maxLength="10"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'C')}
                  value={data[i]['C']}
                  minLength="1"
                  maxLength="1"
                  style={{ maxWidth: '30px' }}
                />
              </td>
              <td>
                {' '}
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'R')}
                  value={data[i]['R']}
                  minLength="1"
                  maxLength="1"
                  style={{ maxWidth: '30px' }}
                />
              </td>
              <td>
                {' '}
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'U')}
                  value={data[i]['U']}
                  minLength="1"
                  maxLength="1"
                  style={{ maxWidth: '30px' }}
                />
              </td>{' '}
              <td>
                {' '}
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'D')}
                  value={data[i]['D']}
                  minLength="1"
                  maxLength="1"
                  style={{ maxWidth: '30px' }}
                />
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={async () => {
                    await updateCRUD(data[i]);
                    mutate('/api/roles');
                  }}
                >
                  Update Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Rbac() {
  const { data, error, mutate } = useCurrentUser();
  const router = useRouter();
  console.log('current userr= ', data);
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace('/login');
    }
  }, [router, data, error]);
  return <RbacRoles user={data?.user} />;
}

function RbacRoles({ user }) {
  const { data, error, mutate } = useSWR('/api/roles', fetcher, {
    refreshInterval: 5000,
  });

  if (!data?.posts) return <div>...loading</div>;
  if (error) return <div>Error</div>;
  if (!user) return <div>no user</div>;
  return <Mytable posts={data.posts} user={user} mutate={mutate} />;
}
