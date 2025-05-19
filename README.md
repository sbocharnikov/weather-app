## Weather Subscription App
1. All endpoints are implemented according to the provided specification using Node.js and NestJS.
2. App data is stored in PostgreSQL. There are 2 entities: `User` and `Subscription` with one-to-one relation between them. Migrations are added.
3. Added Dockerfile and docker-compose.yml.
4. Code is partially covered with unit tests.
5. Simple HTML page for initiating a subscription is implemented.
6. App is deployed to hosting.
7. Cron job for sending out real emails with daily and hourly weather updates is not implemented yet. 

API URL: https://weather-app-oxh4.onrender.com/api

HTML page URL: https://weather-app-oxh4.onrender.com

If the service is not available then please wait for 50 seconds or more and try again. This is a limitation of free plan for this hosting provider.

To run the app localy:
- pull the repository
- download `.env` file from <a href="https://drive.google.com/file/d/1suHPSdqPsV7tXcNdx37g4lhAjFkYrv7v/view?usp=sharing">here</a> and put it to the app folder root
- run command
```bash
docker compose up
```
