export async function handler() {
  return {
    statusCode: 200,
    body: /* html */ `
<html>
<head>
    <title>CDP Inject</title>
    <style>
        body {
            font-family: sans-serif;
        }
    </style>
    <head>
    <body>Hello Dynamic Page</body>
</html>
    `,
    headers: {
      'Content-Type': 'text/html',
    },
  }
}
