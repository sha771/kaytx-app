FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init curl

COPY package*.json ./

RUN npm ci --prefer-offline --no-audit && \
    npm cache clean --force

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const port=process.env.PORT||3001;require('http').get('http://localhost:'+port+'/health', (r)=>{if(r.statusCode!==200)process.exit(1);process.exit(0)}).on('error',()=>process.exit(1))"

ENTRYPOINT ["/usr/sbin/dumb-init", "--"]

CMD ["npx", "tsx", "backend/server.ts"]
