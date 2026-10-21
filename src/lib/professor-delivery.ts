export async function deliverProfessorReview<T>(generate: () => Promise<T>, persist: (result: T) => Promise<void>, release: () => Promise<void>) {
  try {
    const result = await generate();
    await persist(result);
    return result;
  } catch (error) {
    await release().catch(() => undefined);
    throw error;
  }
}