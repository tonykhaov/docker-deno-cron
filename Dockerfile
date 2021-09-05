FROM denoland/deno:1.13.2
WORKDIR /app
COPY . /app
CMD ["deno", "run", "--unstable", "--allow-read", "--allow-write", "index.ts"]