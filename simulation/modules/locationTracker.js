

const locationTracker = {
    location: "Initial Location",
    printLiveLocation() {
        console.log(this.location);
    },
    startLiveLocation() {
        this.liveLocationInterval = setInterval(() => {
            this.printLiveLocation();
        }, 10000);
    },
    stopLiveLocation() {
        clearInterval(this.liveLocationInterval);
    }
};

locationTracker.startLiveLocation();

// To stop after some time (e.g., 30 seconds):
setTimeout(() => {
    locationTracker.stopLiveLocation();
    console.log("Stopped tracking location.");
}, 30000);
