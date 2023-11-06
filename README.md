## Description

This is Mcommerce backend repository. It is built with a microservices architecture using NestJS,MongoDB, fro each service. The services are:

- Auth service
- Product service
- Order service
- Payment service

All service are located at /apps: I'm using NestJS monorepo architecture so that I can share code between services.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start orders-service
$ pnpm run start products-service
$ pnpm run start payment-service

```
