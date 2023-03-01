# Getting Started with Weather App

App web url:
<http://weatherdatavisualization.s3-website.ca-central-1.amazonaws.com/>
I guess meteomatics has contrained CORS by without responding Access-Control-Allow-Origin, it could be accessed successfully by http://localhost url.
## The architecture of the application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

React Component Library: Ant Design.

Time formatting tool: Day.js.

Chart Library: Chart.js.

## Install and test locally

- Install Yarn package managent tool first
- Run yarn in the root directory of project to install packages
- After installing node modules successfully, run yarn start
- Visit http://localhost:3000

**Key Test Points:**

- App supports responsive layout
- Search form supports reset and search
- All parameters are required, no one can\'t be empty. If missing some one, it will prompt a warning and change corresponding component border color
- The app will update the data in real-time by polling requests (every 12s).
- Location input should follow \<latitude\>,\<longitude\> format following meteomatics API specification
- Support temperature, humidity and sunshine/moon light data type
- Optimize data units and date label for Charts

**Notification:** Because registed account is for trial use, start date can\'t be earlier than the day before, otherwise it will respond a error.

## Code structure

- **src**: source code for application
  - **api**
    - **API** : API base URL
    - **getAuthToken** : with user_name and password, get access_token as a query parameter for requesting rest APIs
    - **getLocation** : search locations with \<latitude\>,\<longitude\>
    - **getWeatherData** : request weather data to display with location, time range, weather parameters
  - **components**
    - **ChartsContainer** : a container component with three types visualization objects inside
      - **subComponents**
        - **BarComponent**: Stateless Bar chart component to show humidity data
        - **ChatComponent**: Stateless Multiaxis Line chart component to show sunshine & moon light data
        - **LineComponent**: Stateless Line chart component to show temperature data
    - **SearchForm** : search form component for requesting weather data
  - **style**
    - **chartsContainer**: css style sheet for responsive ChartsContainer
    - **searchForm**: css style sheet for responsive SearchForm
  - **utils**
    - **time**: time format funtion for specific format time output

- **APP.css**: App component style sheet
- **APP.js**: a comtainer component combining SearchForm and ChartsContainer components

- **index.css**: some initial css style
- **index.js**: react renders App into root element

- **public** : files for public use, such as template file index.htmlfor react, favicon, manifest.json

- **node_modules**: installed packages

- **.eslintrc**: eslint configurations
- **.gitignore**: git ignoring files configurations

- **craco.config**: override Ant Design theme color
