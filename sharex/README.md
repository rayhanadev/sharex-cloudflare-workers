# ShareX Server

This worker runs the uploader for ShareX and manages all the R2
databases. Host it at `sharex.example.com`.

This will need the following in `.dev.vars`:

```env
SERVER_API_KEY = ""
```

Make sure to set a different API key for use in production as well!