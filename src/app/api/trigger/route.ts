export async function POST(request: Request) {
  const res = await request.json();

  console.log("POST request received ==>", res);
  // Do whatever you want
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
