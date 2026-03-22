import ClientTable from '../components/ClientTable';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Eloquent Case Study</h1>
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Client Entities</h2>
        <ClientTable />
      </section>
    </div>
  );
}
