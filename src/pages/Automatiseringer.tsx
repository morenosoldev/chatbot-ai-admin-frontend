import Breadcrumb from '../components/Breadcrumb';
import AutomatiseringTable from '../components/AutomatiseringTable';

export default function Automatiseringer() {
  return (
    <>
      <Breadcrumb pageName="Automatiseringer" />

      <div className="flex flex-col gap-10">
        <AutomatiseringTable />
      </div>
    </>
  );
}
