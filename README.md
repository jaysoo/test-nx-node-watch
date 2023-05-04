# NxNode

This repo demonstrates a problem that sometimes happens when Node process is restarted.


Start the app:

```
npx nx serve
```

This will listen on port 3000.

Then run the script to update the source file every second:

```
node watch.mjs
```

You will likely see some errors like this:

```
Starting inspector on localhost:9229 failed: address already in use
{"level":50,"time":1683207767766,"pid":26459,"hostname":"mbp.lan","err":{"type":"Error","message":"listen EADDRINUSE: address already in use ::1:3000","stack":"Error: listen EADDRINUSE: address already in use ::1:3000\n    at Server.setupListenHandle [as _listen2] (node:net:1733:16)\n    at listenInCluster (node:net:1781:12)\n    at GetAddrInfoReqWrap.doListen (node:net:1930:7)\n    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:109:8)","code":"EADDRINUSE","errno":-48,"syscall":"listen","address":"::1","port":3000},"msg":"listen EADDRINUSE: address already in use ::1:3000"}
```

This is due to the new process being launched before the old one is cleaned up.

