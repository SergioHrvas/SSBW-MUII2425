FROM node:23-alpine

WORKDIR /app						
COPY package*.json ./
RUN npm i
								
COPY *.mjs ./
COPY views views
COPY routes routes
COPY public public
COPY prisma prisma
COPY .env* ./
				
RUN npx prisma generate
				
ENV NODE_ENV=production

EXPOSE 8000
				
CMD ["node", "index.mjs"]