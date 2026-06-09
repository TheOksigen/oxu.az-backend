const express = require("express");
const openApiSpec = require("../docs/openapi");

const router = express.Router();

router.get("/openapi.json", (req, res) => {
    res.json(openApiSpec);
});

router.get("/docs", (req, res) => {
    res.type("html").send(`<!doctype html>
<html>
  <head>
    <title>Oxu.az Backend API</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      Scalar.createApiReference('#app', {
        url: '/openapi.json',
        theme: 'default'
      })
    </script>
  </body>
</html>`);
});

module.exports = router;
