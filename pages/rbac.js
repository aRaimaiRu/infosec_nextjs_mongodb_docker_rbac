import React, { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';
import { useCurrentUser } from '@/lib/user';
import { useRouter } from 'next/router';

function Mytable({ posts }) {
  const [data, setData] = useState(posts);

  const handleChange = (changeTo, ind, key) => {
    setData((prevState) =>
      prevState.map((s, i) => (i == ind ? { ...s, [key]: changeTo } : s))
    );
  };
  console.log(posts);
  return (
    <div>
      <table className="table table-dark">
        <thead>
          <tr>
            {Object.keys(posts[0]).map((h, k) => (
              <th key={k + 'th'}>{h}</th>
            ))}
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
                  maxLength="1"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => handleChange(e.target.value, i, 'C')}
                  value={data[i]['C']}
                  minLength="1"
                  maxLength="1"
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
                />
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
  const { data, error } = useSWR('/api/roles', fetcher, {
    refreshInterval: 5000,
  });

  if (!data) return <div>...loading</div>;
  if (error) return <div>Error</div>;

  return <Mytable posts={data.posts} user={user} />;
}