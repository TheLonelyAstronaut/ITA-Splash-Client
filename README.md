# Splash

**Splash** - Typescript-powered cross-platform music streaming app.

## Documentation
Read Project SRS to check requirements.
## System modules
### Client
Splash cross-platform (iOS-first design) mobile client was written on TypeScript, using React Native framework. 
Key features & libraries:

 - Reanimated for smooth animation on UI thread
 - Apollo GraphQL as communication layer with API
 - Redux Saga & Redux Persist for data management
 - Firebase Crushlytics/Analytics to collect statistics
 - Shared Transitions for smooth shared navigation transitions
 
 ### Server
 Splash server was written on TypeScript, using Express/Apollo Server frameworks.
 Key features & libraries:
 - GraphQL runtime for building server API
 - Amazon AWS S3 API for file managing
 - Heroku as host platform
 - Heroku PostgreSQL for storing serializable data
 - Sequelize ORM for easy and fast access to data in PostgreSQL
 
 ## Start the project 
 ```
 cd splash-client
//To run iOS client
yarn ios
//To run Android client
yarn android

cd splash-server
//To run server
yarn build && yarn build && yarn start:watch
//To open webview of database
yarn start:pgweb
```
