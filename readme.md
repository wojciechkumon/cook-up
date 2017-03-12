build: mvn clean install

run: java -jar target/{jar-name}.jar


react dev:
1. Start main using intellij 
2. npm run watch
3. Change anything inside web/ directory and refresh browser


Installing Postgresql database:
1. Install postgresql
2. Run psql
3. CREATE ROLE "cookUp" SUPERUSER LOGIN PASSWORD 'cookUpPass';
4. CREATE DATABASE "cookUp" OWNER "cookUp";

To log in to db from console: psql -d "cookUp" -U "cookUp"


Running prod version:
1. Run jar with parameter: --spring.profiles.active=prod
