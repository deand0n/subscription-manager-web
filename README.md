# Subscription-manager-web

This is fullstack application with telegram integration, aimed to automate management of subscriptions.

It consists of frontend (admin page), backend (store the data), telegram integration (billing notifications)

## Telegram integration

Integration works via telegram bot with group privacy mode turned off.

A daily cron job at 19:00 (UTC) checks for un-billed resources. If any are found, it creates bill and bill_subscriber entities, and then sends a message to a Telegram group, mentioning each bill_subscriber if possible.

## Stack

- Sveltekit + ts (<https://kit.svelte.dev/>) - framework
  - Tailwind (<https://tailwindcss.com/>)
  - Skeleton (<https://www.skeleton.dev/>)
- Posgresql - database
- kysely - query builder

## Developing

### Install dependencies

```bash
npm i
```

### Env variables

1. Copy file .env.example
2. Rename .env.example to .env
3. Provide values to env variables in .env

### Start dev server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploy

### Build docker image

```bash
docker-compose build --no-cache
```

### Run docker container

```bash
docker-compose up
```

### Run migrations

#### Find container id

```bash
docker ps
```

#### Inject sh into container

```bash
docker exec -t -i ID /bin/sh

> npm run migrate:up
```
