# Laravel Backend

The backend application built using Laravel, and the admin frontend built using FilamentPHP.

---

## Running in development with Laravel Sail

1. Prerequisites:

    - Docker and Docker Compose installed on your machine.
  
2. Copy the `.env.example` file to `.env` and configure your settings.

3. Install the dependencies using Composer:
    - For this you can use the local Composer installation if you have PHP and Composer installed and the required PHP extensions:

    ```bash
    composer install
    ```

    - Or you can use a temporary container:

    ```bash
      docker run --rm \
      -u "$(id -u):$(id -g)" \
      -v "$(pwd):/var/www/html" \
      -w /var/www/html \
      laravelsail/php84-composer:latest \
      composer install --ignore-platform-reqs
    ```

4. Run the backend with `sail` using the command:

    ```bash
    ./vendor/bin/sail up -d
    ```

5. Set the application key:

   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

6. Run the database migrations and seed the database:

   ```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

   - Optionally you can also seed fake data for testing:

   ```bash
   ./vendor/bin/sail artisan db:seed --seeder=TestSeeder
    ```

7. Configure minio bucket to be public:

   - Enter the MinIO container shell:
   - Take not of your MinIO URL, username, password and bucket name from the `.env` file.
   - Run the following commands:

   ```bash
   mc alias set minio <URL> <USERNAME> <PASSWORD>
   mc anonymous set public <BUCKET_NAME
   ```

   - Alternatively, you can set the filesystem driver to `public` and link the storage:

   ```bash
   ./vendor/bin/sail artisan storage:link
   ```

8. Optionally regenerate the OpenAPI documentation:

    ```bash
    ./vendor/bin/sail artisan scribe:generate
    ```

9. Optionally run the tests to verify everything is working:

   ```bash
   ./vendor/bin/sail test
   ```

10. Access the application:

    - The backend API will be accessible at `http://localhost:8000`.
    - The Filament admin panel will be accessible at `http://localhost:8000/admin`.
    - The OpenAPI documentation will be accessible at `http://localhost:8000/docs`.

---

## Running in development without Sail

- If you don't want to use `sail`, you can run the application using your local PHP environment.
- Some PHP extensions may be required, refer to the `composer.json` file for details.
- Make sure to set up the
 necessary services (like MySQL, Redis, etc.) as per your `.env` configuration, and or edit the `Dockerfile` /
  `docker-compose.yml` to suit your
  environment.
- Follow the same steps as above for setting up the environment, running migrations, and seeding the database.

---

## Next steps

- Refer to the README-s of the Frontend and Proxy apps on how to run them.
