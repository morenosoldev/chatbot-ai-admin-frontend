import Breadcrumb from '../components/Breadcrumb';
import CreateUserModal from '../components/CreateUserModal';
import UserTable from '../components/UserTable';
import { useState } from 'react';

const Tables = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Brugere" />

      <div className="flex flex-col gap-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white font-bold py-2 px-4 rounded"
        >
          Opret brugere
        </button>
        <CreateUserModal showModal={showModal} setShowModal={setShowModal} />
        <UserTable />
      </div>
    </>
  );
};

export default Tables;
