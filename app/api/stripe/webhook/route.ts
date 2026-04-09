export async function POST() {
  return new Response(JSON.stringify({ error: 'Not implemented in Expo frontend bundle.' }), {
    status: 501,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
