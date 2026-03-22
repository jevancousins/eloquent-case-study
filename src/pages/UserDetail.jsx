import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building2, Mail, CreditCard, Pencil, X, Calendar } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { getUserStats } from '../utils/stats';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, transactions, updateUser } = useApp();
  const user = users.find(u => u.id === id);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localSegment, setLocalSegment] = useState(user?.segment || '');
  const [localLTV, setLocalLTV] = useState(0);
  const [localTxCount, setLocalTxCount] = useState(0);
  const [localLastActivity, setLocalLastActivity] = useState('');

  if (!user) {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-[#57288F] transition-colors group cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
        <p className="text-gray-600">User not found.</p>
      </div>
    );
  }

  const stats = getUserStats(user, transactions);

  const startEditing = () => {
    setLocalLTV(stats.totalSpent);
    setLocalTxCount(stats.txCount);
    const isoDate = stats.lastTxDateISO
      ? new Date(stats.lastTxDateISO).toISOString().split('T')[0]
      : '';
    setLocalLastActivity(isoDate);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = { segment: localSegment };

    if (editing) {
      updates.lifetimeValueOverride = localLTV;
      updates.transactionCountOverride = localTxCount;
      if (localLastActivity) {
        updates.lastActivityOverride = new Date(localLastActivity).toISOString();
      }
    }

    await updateUser(user.id, updates);
    setSaving(false);
    setEditing(false);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-500 hover:text-[#57288F] transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium mr-3">
              ID: {user.id}
            </span>
            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Button variant="success" loading={saving} onClick={handleSave} className="shadow-md hover:shadow-lg cursor-pointer">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Entity Configuration */}
        <Card className="border-l-4 border-l-[#57288F]">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Entity Configuration</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Segment</label>
              <select
                value={localSegment}
                onChange={e => setLocalSegment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-[#57288F] focus:ring-[#57288F] transition-all"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="SME">SME</option>
                <option value="Startup">Startup</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-600 border border-gray-100 flex items-center justify-between">
                <span className="capitalize">{user.status}</span>
                <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <Card>
            <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
              <Building2 className="w-4 h-4 mr-2" /> Contact Details
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-400">Email Address</div>
                <div className="text-gray-900 font-medium flex items-center">
                  <Mail className="w-3 h-3 mr-2 text-gray-400" />
                  {user.email}
                </div>
              </div>
            </div>
          </Card>

          {/* Financial Overview */}
          <Card className={`transition-all duration-300 ${editing ? 'ring-2 ring-[#57288F]/20 shadow-md' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Financial Overview
              </h3>
              <Button variant="ghost" onClick={editing ? cancelEditing : startEditing} className="h-8 px-2 text-xs cursor-pointer">
                {editing ? (
                  <span className="flex items-center text-gray-500">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </span>
                ) : (
                  <span className="flex items-center text-[#57288F]">
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </span>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Lifetime Value</div>
                {editing ? (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={localLTV}
                      onChange={e => setLocalLTV(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 text-sm font-bold text-[#57288F] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                    />
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#57288F]">${stats.totalSpent.toLocaleString()}</div>
                )}
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Total Transactions</div>
                {editing ? (
                  <input
                    type="number"
                    value={localTxCount}
                    onChange={e => setLocalTxCount(Number(e.target.value))}
                    className="w-full px-4 py-2 text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-900">{stats.txCount}</div>
                )}
              </div>
              <div className="col-span-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-400 mb-1">Last Activity</div>
                {editing ? (
                  <input
                    type="date"
                    value={localLastActivity}
                    onChange={e => setLocalLastActivity(e.target.value)}
                    className="w-full px-4 py-2 text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-700 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                    {stats.lastTxDate}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
