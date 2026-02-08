app.all("/uploads/*", auth, (req, res) => {
  tusServer.handle(req, res);
});