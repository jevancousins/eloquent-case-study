export function getUserStats(user, transactions) {
  const completedTxs = transactions.filter(
    tx => tx.userId === user.id && tx.status === 'completed'
  );

  const totalSpent = user.lifetimeValueOverride !== undefined
    ? user.lifetimeValueOverride
    : completedTxs.reduce((sum, tx) => sum + tx.amount, 0);

  const txCount = user.transactionCountOverride !== undefined
    ? user.transactionCountOverride
    : completedTxs.length;

  let lastTxDate = 'Never';
  let lastTxDateISO = '';
  if (user.lastActivityOverride) {
    lastTxDate = new Date(user.lastActivityOverride).toLocaleDateString();
    lastTxDateISO = user.lastActivityOverride;
  } else if (completedTxs.length > 0) {
    const sorted = [...completedTxs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    lastTxDate = new Date(sorted[0].date).toLocaleDateString();
    lastTxDateISO = sorted[0].date;
  }

  return { totalSpent, txCount, lastTxDate, lastTxDateISO };
}

export function computeMetrics(users, transactions) {
  const enterpriseUserIds = new Set(
    users.filter(u => u.segment === 'Enterprise').map(u => u.id)
  );

  let totalLTV = 0;
  for (const user of users) {
    const stats = getUserStats(user, transactions);
    totalLTV += stats.totalSpent;
  }
  const avgCustomerLTV = Math.round(totalLTV / users.length);

  const completedTxs = transactions.filter(tx => tx.status === 'completed');
  const totalCompletedRevenue = completedTxs.reduce((sum, tx) => sum + tx.amount, 0);
  const enterpriseRevenue = completedTxs
    .filter(tx => enterpriseUserIds.has(tx.userId))
    .reduce((sum, tx) => sum + tx.amount, 0);
  const enterpriseShare = (enterpriseRevenue / totalCompletedRevenue * 100).toFixed(1);

  const now = new Date('2026-03-04T12:00:00Z');
  let atRiskCount = 0;
  for (const user of users) {
    if (user.status !== 'active') continue;
    if (user.segment !== 'Enterprise' && user.segment !== 'SME') continue;
    const stats = getUserStats(user, transactions);
    if (!stats.lastTxDateISO) {
      atRiskCount++;
    } else {
      const daysSince = (now - new Date(stats.lastTxDateISO)) / (1000 * 60 * 60 * 24);
      if (daysSince > 60) atRiskCount++;
    }
  }

  return { avgCustomerLTV, enterpriseShare, atRiskCount };
}
