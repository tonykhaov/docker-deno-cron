FROM denoland/deno:1.13.2
WORKDIR /app
COPY . /app
CMD ["deno", "run", "index.ts"]