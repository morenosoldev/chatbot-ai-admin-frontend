import instance from '../axios/instance';
import { useEffect, useState } from 'react';

const TableTwo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/users');
        if (response.data.length > 0) {
          setUsers(response.data); // Assuming the response contains an array of user objects
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Brugere
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Virksomhedsnavn</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500">Ikke nogle brugere fundet</p>
          {/* You can customize the message or UI for displaying no users */}
        </div>
      ) : (
        users.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-3 flex items-center">
              {/* User data rendering */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TableTwo;
