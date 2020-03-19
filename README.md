# weather-app
to learn angular basic concepts

After cloning the Project:
  - run 'npm install' in folder weather-app/weather-app

To run the Web-Client:
  - run 'ng serve --proxy-config proxy.conf.json' in folder weather-app/weather-app

To run the Web-API (backend):
  - execute 'dotnet run' in folder weather-app/weather-api

For backend:
  Add a new migration:
    dotnet ef migrations add MigrationName
  Update the Database:
    dotnet ef database update
