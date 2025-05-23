//this file sends requests every interval to keep the render instance always alive.
const interval = 300000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
  axios
    .get("https://server.scholiast.webios.link/keep-alive")
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`,
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message,
      );
    });
}

setInterval(reloadWebsite, interval);
