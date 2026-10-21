/** Import only keys explicitly scoped to the signed-in owner, never legacy keys. */
export function ownedProfessorRecords(storage: Pick<Storage, "length" | "key" | "getItem">, userId: string) {
  const prefix = `euf.professor.v1.account.${userId}.`;
  const records: { kind: "professor"; id: string; payload: Record<string, unknown> }[] = [];
  for (let index = 0; index < storage.length; index++) {
    const key = storage.key(index);
    if (!key?.startsWith(prefix)) continue;
    try {
      const feedback = JSON.parse(storage.getItem(key) ?? "null");
      if (!feedback?.bilan || !Array.isArray(feedback.observations)) continue;
      records.push({ kind: "professor", id: key.slice(prefix.length), payload: { feedback, language: key.split(".").at(-1), date: new Date().toISOString() } });
    } catch { /* Leave unreadable legacy records untouched. */ }
  }
  return records;
}