# Laravel Backend

The backend application built using Laravel, and the admin frontend built using FilamentPHP.

---

## Running in development with Laravel Sail

- Prerequisites:
  - Docker and Docker Compose installed on your machine.
  - Laravel Sail installed as a development dependency in your project.

- Copy the `.env.example` file to `.env` and configure your settings.

- Run the backend with `sail` using the command:

```bash
./vendor/bin/sail up -d
```

- Optionally regenerate the OpenAPI documentation:

```bash
./vendor/bin/sail artisan scribe:generate
```

---

## Running in development without Sail

- If you don't want to use `sail`, you can run the application using your local PHP environment. Make sure to set up the
  necessary services (like MySQL, Redis, etc.) as per your `.env` configuration, and or edit the `Dockerfile` /
  `docker-compose.yml` to suit your
  environment.

---

## Next steps

- Refer to the README-s of the Frontend and Proxy apps on how to run them.
