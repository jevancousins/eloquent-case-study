import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Card from './Card';
import { useApp } from '../context/AppContext';
import { getUserStats } from '../utils/stats';

const segmentStyles = {
  Enterprise: 'bg-purple-100 text-purple-800',
  SME: 'bg-blue-100 text-blue-800',
  Startup: 'bg-gray-100 text-gray-800',
  Individual: 'bg-gray-100 text-gray-800',
};

export default function ClientTable() {
  const { users, transactions } = useApp();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.ceil(users.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageUsers = users.slice(start, end);

  return (
    <div className="space-y-4">
      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F9F6F0] text-gray-600 font-medium border border-gray-200">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Segment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4 text-right">Total Spent</th>
                <th className="px-6 py-4 text-right">Transactions</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageUsers.map((user) => {
                const stats = getUserStats(user, transactions);
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${segmentStyles[user.segment]}`}>
                        {user.segment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      ${stats.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {stats.txCount}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {stats.lastTxDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#57288F] transition-colors inline-block" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {totalPages > 1 && (
        <div className="bg-[#F9F6F0] pt-3 pb-2 -mx-1 px-1">
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-500">
              Showing {start + 1}-{Math.min(end, users.length)} of {users.length} entities
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      p === page
                        ? 'bg-[#57288F] text-white shadow-md'
                        : 'bg-white text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
