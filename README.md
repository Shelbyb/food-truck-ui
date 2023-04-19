## Food Truck Location App (UI)
[Project Github repo](https://github.com/Shelbyb/food-truck-ui)

### Features
* View food trucks around you, assuming you're in San Francisco
* If you grant your browser permission, the map will auto center on your location (default location is SF)
* Information is displayed about each food trick when you click on them
* Hot module reload when in dev mode including when using the Docker container
* Server side rendering
* Powered by [Next.js](https://nextjs.org/) (a React framework)
* Uses **Node 18**

### Local Environment Setup

URL: http://localhost:3000

```bash
# Run the app in a Docker Container
npm run docker
# Or, run the app directly on your machine
npm install 
npm run dev
```

### Prod Environment Setup

URL: http://YOUR_DOMAIN.com

- Bind the external port to container port `3000`
- Launch the Dockerfile



### Things I would add, if I had more time
- A floating menu that
  - Lets you choose how many food trucks are on the map
  - A text search to look for specific food trucks, of the food they make
  - Allow filtering of food trucks
- Display more information per food truck
- Unit tests
