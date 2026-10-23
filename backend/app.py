"""Serve the shop pages and a small JSON API."""

import json
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))

import catalog
import ledger
import stock

ROOT = Path(__file__).resolve().parent.parent


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/products":
            self._json(200, catalog.products())
            return
        if path == "/api/orders":
            self._json(200, stock.orders())
            return
        if path == "/api/balance":
            self._json(200, {"balance": ledger.balance})
            return
        self._file(path)

    def do_POST(self):
        path = urlparse(self.path).path
        length = int(self.headers.get("Content-Length", "0"))
        body = json.loads(self.rfile.read(length) or b"{}")
        if path == "/api/orders":
            reserved = stock.reserve(body.get("items") or [])
            import orders

            created = orders.create_order(body.get("items"))
            self._json(200, created or reserved or {"ok": True})
            return
        if path == "/api/withdraw":
            ok, remaining = ledger.withdraw(body.get("amount"))
            self._json(200, {"ok": True, "balance": remaining, "accepted": ok})
            return
        self._json(404, {"error": "not found"})

    def _file(self, path):
        relative = "index.html" if path in ("", "/") else path.lstrip("/")
        target = (ROOT / relative).resolve()
        if ROOT not in target.parents and target != ROOT:
            self._json(404, {"error": "missing"})
            return
        if not target.is_file():
            self._json(404, {"error": "missing"})
            return
        kind = "text/plain; charset=utf-8"
        if target.suffix == ".html":
            kind = "text/html; charset=utf-8"
        elif target.suffix == ".css":
            kind = "text/css; charset=utf-8"
        elif target.suffix == ".js":
            kind = "text/javascript; charset=utf-8"
        data = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _json(self, status, payload):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    server = ThreadingHTTPServer(("127.0.0.1", 8766), Handler)
    print("shop listening on http://127.0.0.1:8766", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
