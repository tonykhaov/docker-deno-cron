# docker-deno-cron

Hello this is just a test with docker. And because I wanna try new things I
decided to use deno (mostly because nodejs doesn't support TypeScript natively
and ts-node with esmodules sucks).

This is a cron job, that will run on a docker container and console log every 10
minutes (HH:00:SS, HH:10:SS, HH:20:SS, etc.).

1. Build the docker image: `docker build -t deno-cron .`
2. Run the docker container `docker run --restart=unless-stopped deno-cron`
