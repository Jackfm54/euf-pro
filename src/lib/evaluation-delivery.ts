/** Delivery is chargeable only after durable account storage succeeds. */
export async function deliverEvaluation(save: () => void | Promise<void>, acknowledge: () => Promise<unknown>) {
  await save();
  await acknowledge();
}