/* eslint-disable */
export default () => {
    function tickBreakTime() {
        self.remainingTicks--;
        console.log(self.remainingTicks);
        postUpdateMessage();

        if (self.remainingTicks === 0) {
            new Notification('Break complete.');
            clearInterval(self.countdown);
            setupScreenTimeCountdown();
        }
    }

    function tickScreenTime() {
        self.remainingTicks--;
        console.log(self.remainingTicks);
        postUpdateMessage();

        if (self.remainingTicks === 0) {
            new Notification('Look away from the screen for 20 seconds.');
            clearInterval(self.countdown);
            setupBreakTimeCountdown();
        }
    }

    function stop() {
        clearInterval(self.countdown);
        self.mode = 'stopped';
        self.remainingTicks = 20 * 60;
    }

    function setupBreakTimeCountdown() {
        self.remainingTicks = 20;
        self.mode = 'break';
        self.countdown = setInterval(tickBreakTime, 1000);
    }

    function setupScreenTimeCountdown() {
        self.remainingTicks = 20 * 60; // 20 minutes.
        self.mode = 'screenTime';
        self.countdown = setInterval(tickScreenTime, 1000);
    }

    function postUpdateMessage() {
        self.postMessage({
            mode: self.mode,
            remainingTicks: self.remainingTicks
        });
    }

    self.addEventListener(
        "message",
        function (e) {
            if (e.data === 'start') {
                setupScreenTimeCountdown();
            }
            else {
                stop();
            }

            postUpdateMessage();
        },
        false
    );

};
