import React, { useState, ChangeEvent, FormEvent } from 'react';
import axiosInstance from '../axios/instance';

interface FormData {
  email: string;
  name: string;
  password: string;
}

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUserModal = ({ showModal, setShowModal }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post('/auth/sign-up', formData);

      setFormData({
        email: '',
        name: '',
        password: '',
      });
      setShowModal(false);
    } catch (error) {
      console.error('User creation failed!', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="absolute bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Opret bruger</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              {/* Add other necessary input fields for user creation */}
              <button
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Opret'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-black text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                Annuller
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUserModal;
