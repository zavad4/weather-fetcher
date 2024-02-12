export default function () {
  const req = ['DATABASE_URL', 'API_KEY'];

  req.forEach((variable) => {
    if (process.env[variable] == null) {
      throw new Error(`[${variable}] environment variable is not specified`);
    }
  });
}
