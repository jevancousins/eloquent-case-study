import ClientTable from '../components/ClientTable';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Eloquent Case Study</h1>
      </header>
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Client Entities</h2>
        </div>
        <ClientTable />
      </section>
    </div>
  );
}
