FROM node:16.14.0
RUN mkdir -p /bot
WORKDIR /bot
COPY package.json pnpm-lock.yaml tsconfig.json .env src /bot/
# install pnpm
RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
RUN pnpm i
RUN pnpm run build
CMD ["pnpm", "run", "start"]