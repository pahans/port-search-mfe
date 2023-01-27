FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat g++ make py3-pip

WORKDIR /app
COPY . .

COPY package.json package-lock.json ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat g++ make py3-pip
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm install -g nx@14.8.6
RUN nx run-many --target=build

# 3. Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist/apps ./

EXPOSE 4200

CMD [ "npx", "serve", "-s" , "-l" , "4200" , "./shell" , "--cors"]