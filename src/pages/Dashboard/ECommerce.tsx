import TableOne from '../../components/TableOne.tsx';

const ECommerce = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
