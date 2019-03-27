# Aircraft scheduling

<img src="https://thumbs.gfycat.com/UnfitCriminalGermanwirehairedpointer-max-1mb.gif"  width="300" height="300" />

This app allows users to create a rotation for a specific aircraft.

Hovering the i icon next to the title shows information about using the app.

Users can click on an aircraft to see its available flights.

Users can click on a flight in the flights list to add it to the rotation.

Users can click on a flight in the rotation to remove it

A 24h aircraft timeline is shown below the rotation table. Scheduled service in green, turnaround time in red, idle time in grey.

The total usage of the specific aircraft for the 24h period is also showed in percentage underneath the aircraft's name

The app uses:

- Bootstrap classes and components for faster development.
- Jest and Enzyme for testing

## Getting Started

Install the project dependencies.
Node version 10+ is needed to run the app

```bash
yarn install
```

### Development

No need to build, just start the server.

```bash
yarn start
```

### Running unit tests locally

```bash
yarn test
```

### Production

Build the application.

```bash
yarn build
```

Start the application.

```bash
yarn start
```

The app should open automatically in the browser. If not, navigate to http://localhost:3000/
