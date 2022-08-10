export default async function handler(request: Request) {
  return new Response(JSON.stringify(globalThis.location), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
