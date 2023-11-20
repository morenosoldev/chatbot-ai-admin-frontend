import Breadcrumb from '../components/Breadcrumb';
import CreateUserModal from '../components/CreateUserModal';
import TableTwo from '../components/TableTwo';
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
        <TableTwo />
      </div>
    </>
  );
};

export default Tables;
