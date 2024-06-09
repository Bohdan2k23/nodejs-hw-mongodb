export function env(key, defoult) {
  return process.env[key] || defoult;
}
