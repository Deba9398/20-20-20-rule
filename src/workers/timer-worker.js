/* eslint-disable */
export default () => {
    function tickBreakTime() {
        self.remainingTicks--;
        postUpdateMessage();

        if (self.remainingTicks === 0) {
            clearInterval(self.countdown);
            setupScreenTimeCountdown();
        }
    }

    function tickScreenTime() {
        self.remainingTicks--;
        postUpdateMessage();

        if (self.remainingTicks === 0) {
            clearInterval(self.countdown);
            setupBreakTimeCountdown();
        }
    }

    function stop() {
        clearInterval(self.countdown);
        self.mode = 'stopped';
        self.remainingTicks = self.timerScreenTimeTicks;
    }

    function setupBreakTimeCountdown() {
        self.remainingTicks = self.timerBreakTimeTicks;
        self.mode = 'break';
        self.countdown = setInterval(tickBreakTime, 1000);
    }

    function setupScreenTimeCountdown() {
        self.remainingTicks = self.timerScreenTimeTicks;
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
            if (e.data.mode === 'start') {
                self.timerScreenTimeTicks = e.data.timerScreenTimeTicks;
                self.timerBreakTimeTicks = e.data.timerBreakTimeTicks;
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
