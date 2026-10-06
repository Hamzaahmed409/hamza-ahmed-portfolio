function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function assertJobsEnabled() {
  if (process.env.ENABLE_JOBS !== "true") {
    return json({ error: "Not found." }, 404);
  }
  return null;
}
