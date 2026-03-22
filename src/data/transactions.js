function createPRNG(seed) {
  let t = seed;
  return () => {
    t = (t * 1664525 + 1013904223) & 4294967295;
    return (t >>> 0) / 4294967295;
  };
}

export function generateTransactions(users) {
  const rng = createPRNG(42);
  const referenceDate = new Date("2026-03-04T12:00:00Z");
  const specialUsers = ["u5", "u13", "u17"];
  const transactions = [];

  users.forEach(user => {
    const txCount = user.segment === "Enterprise" ? 15 : user.segment === "SME" ? 8 : 3;

    for (let i = 0; i < txCount; i++) {
      // Date first (matches reference order)
      const txDate = new Date(referenceDate);
      if (specialUsers.includes(user.id)) {
        txDate.setDate(txDate.getDate() - (75 + Math.floor(rng() * 30)));
      } else {
        txDate.setDate(txDate.getDate() - Math.floor(rng() * 90));
      }

      const amount = user.segment === "Enterprise"
        ? Math.floor(rng() * 5000) + 1000
        : Math.floor(rng() * 500) + 50;

      const status = rng() > 0.1 ? "completed" : "failed";
      const category = rng() > 0.7 ? "Add-on" : "Subscription";

      transactions.push({
        id: `tx_${user.id}_${i}`,
        userId: user.id,
        amount,
        date: txDate.toISOString(),
        status,
        category,
      });
    }
  });

  return transactions;
}
