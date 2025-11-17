# Kubernetes Proxy

A small proxy app to use the Kubernetes JS client library to expose Kubernetes API resources over HTTP to the backend.

---

## Running in development

- Prerequisites:
    - Docker and Docker Compose installed
    - A running Kubernetes cluster accessible from your machine, with a Traefik ingress controller set up
    - Backend service running (see the backend README for instructions)

- Steps:
    1. Setup your Kubernetes configuration at .kube/config or with other methods.
        - An example is provided at `kube/config.example` you can copy to `kube/config` and modify as needed.
    2. Copy `.env.example` to `.env` and modify it as needed.
    3. Run the following command to start the proxy service:

       ```bash
       docker-compose up -d
       ```
    4. If needed open the kubernetes cluster proxy, eg:

       ```bash
       kubectl proxy --address=0.0.0.0 --port=8080
       ```

- Next Steps:
    - Run the frontend service (see the frontend README for instructions).