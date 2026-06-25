// cPanel / Phusion Passenger için Next.js özel sunucusu.
//
// Paylaşımlı hostingde NPROC (işlem/thread) limiti düşük olduğundan, Next.js'in
// içindeki native runtime'lar (tokio/rayon/libuv) çok thread açıp "OS can't spawn
// worker thread" ile çöküyordu. Bu thread sayısını dibe çekiyoruz:

// 1) Thread havuzu env'leri (require'dan ÖNCE)
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || "2";
process.env.TOKIO_WORKER_THREADS = process.env.TOKIO_WORKER_THREADS || "1";
process.env.RAYON_NUM_THREADS = process.env.RAYON_NUM_THREADS || "1";

// 2) CPU affinity'yi tek çekirdeğe sabitle. tokio/rayon "görünür CPU sayısı" kadar
//    worker thread açtığı için, bu adım açılan thread sayısını ciddi düşürür.
try {
  const cp = require("child_process");
  for (const bin of ["taskset", "/usr/bin/taskset", "/bin/taskset"]) {
    try {
      cp.execSync(`${bin} -pc 0 ${process.pid}`, { stdio: "ignore" });
      break;
    } catch {
      /* sonraki yolu dene */
    }
  }
} catch {
  /* taskset yok/izin yok -> env limitleriyle devam */
}

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
