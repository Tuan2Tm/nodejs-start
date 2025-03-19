### Bước 1: Cài đặt docker compose

#### docker-compose.yml
```javascript
version: "3.8"
services:
  mongo:
    image: mongo:latest
    command: ["--replSet", "rs0", "--bind_ip_all"]
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

### docker cli

```javascript
# Khởi động container MongoDB với Replica Set
docker run -d \
  --name mongo \
  --restart unless-stopped \
  -p 27017:27017 \
  --mount source=mongo-data,target=/data/db \
  mongo:latest \
  --replSet rs0 \
  --bind_ip_all
```

### Bước 2: cài đặt replica set

```javascript
docker exec -it <container_name> mongosh
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "localhost:27017" }] })
```
#### DATABASE_URL="mongodb://localhost:27017/myDatabase?replicaSet=rs0&retryWrites=true&w=majority"

### Bước 3: Khởi tạo prisma

```javascript
npm install prisma --save-dev
npm install @prisma/client
npx prisma init

# khởi tạo model
npx prisma db push
```
