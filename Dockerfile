FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000 5173

# Default command
CMD ["bun", "run", "dev"]