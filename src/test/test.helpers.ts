export function clearDB(db:Record<string, unknown>) {
  for (const key of Object.keys(db)) {
    delete db[key];
  }
}