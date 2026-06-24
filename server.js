// cPanel / Phusion Passenger için Next.js özel sunucusu.
// Passenger uygulamayı bu dosya üzerinden başlatır ve PORT'u kendisi verir.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Next.js hazir, port: ${port}`);
  });
});
