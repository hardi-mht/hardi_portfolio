/**
 * PM2 process config.
 *
 * This site is a static export (`output: "export"` in next.config.ts), so
 * there is no Node server for PM2 to supervise — `next start` refuses to run
 * against an exported build. What PM2 can usefully do is serve the generated
 * `out/` directory, which is what this config does via its built-in static
 * server (`script: "serve"` plus the PM2_SERVE_* variables).
 *
 * If you deploy to Vercel, Netlify or Cloudflare Pages you do not need this
 * file at all — those hosts serve `out/` themselves. It is for a VPS or any
 * box where you want the site kept alive across crashes and reboots.
 *
 *   npm run build                      # regenerate ./out
 *   pm2 start ecosystem.config.js      # serve it
 *   pm2 save && pm2 startup            # survive a reboot
 *   pm2 reload hardi-portfolio         # after a later build
 */
module.exports = {
  apps: [
    {
      name: "hardi-portfolio",
      script: "serve",

      env: {
        PM2_SERVE_PATH: "./out",
        PM2_SERVE_PORT: 3000,

        // Deliberately not an SPA. SPA mode rewrites every unmatched request
        // to index.html, which would make /experience and /projects/<id>
        // resolve to the home page and hide genuine 404s. This site exports
        // a real directory per route, so plain static serving is correct.
        PM2_SERVE_SPA: "false",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },

      // One process is plenty: serving pre-built files is I/O, not CPU, and
      // cluster mode would only add memory. Raise `instances` and set
      // exec_mode: "cluster" if this ever fronts real traffic without a CDN.
      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      // `out/` only changes when you deploy, and watching it would restart
      // the server mid-build as Next writes files.
      watch: false,
      max_memory_restart: "256M",

      // Timestamped lines, because the default log has no clock and a static
      // server's output is otherwise impossible to correlate with anything.
      time: true,
    },
  ],
};
