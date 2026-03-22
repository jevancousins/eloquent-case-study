import { createContext, useContext, useState } from 'react';
import { users as initialUsers } from '../data/users';
import { generateTransactions } from '../data/transactions';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [transactions] = useState(() => generateTransactions(initialUsers));

  const updateUser = async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updates } : u))
    );
  };

  return (
    <AppContext.Provider value={{ users, transactions, updateUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
