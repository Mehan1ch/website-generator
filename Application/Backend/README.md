# Laravel Backend

---

## Running in Development

- Prerequisites:
    - Docker and Docker Compose installed on your machine.
    - Laravel Sail installed as a development dependency in your project.

- Copy the `.env.example` file to `.env` and configure your settings.
- Provide your own kubernetes cluster configuration file in `.kube/config`. An example file is provided at
  `.kube/config.example` suited for local development.
    - If you need start a proxy to your kubernetes cluster, you can use `kubectl proxy --port=8080 --address=0.0.0.0`
    - Traeffik is expected to be running in your kubernetes cluster for routing as an ingress controller.
- Run the backend with `sail` using the command:

```bash
./vendor/bin/sail up -d
```

- Generate the OpenAPI documentation:

```bash
./vendor/bin/sail artisan scribe:generate
```

- Next steps:
    - Refer to the README-s of the Frontend and Proxy apps and run them.

--- 

## Running without Sail

- If you don't want to use `sail`, you can run the application using your local PHP environment. Make sure to set up the
  necessary services (like MySQL, Redis, etc.) as per your `.env` configuration, and or edit the `Dockerfile` /
  `docker-compose.yml` to suit your
  environment.
