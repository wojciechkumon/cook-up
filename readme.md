# Cook Up #


**build:** `mvn clean install`



**run:** `java -jar target/{jar-name}.jar`



**react dev:**

1. Start main using intellij or run built jar
1. `npm run dev`
1. Open localhost:9000 in browser
1. Change anything inside web/ and observe (dev server is using hot code reload - no browser refresh required)


**Installing Postgresql database:**

1. Install postgresql
1. Run `psql`
1. `CREATE ROLE "cookUp" SUPERUSER LOGIN PASSWORD 'cookUpPass';`
1. `CREATE DATABASE "cookUp" OWNER "cookUp";`

To log in to db from console: `psql -d "cookUp" -U "cookUp"`


**Running prod version:**

Run jar with parameter: `--spring.profiles.active=prod`.
You can pass additional parameters to specify database url, check application.yml for details.