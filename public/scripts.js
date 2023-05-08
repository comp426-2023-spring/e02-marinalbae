// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function play() {
    if (!document.getElementById("rps").checked && !document.getElementById("rpsls").checked) {
        alert("Please select a game mode.");
        throw new RangeError(`Must select game mode before playing.`);
    }
    document.getElementById("game_options").className = "inactive";
    document.getElementById("shot_options").className = "inactive";
    document.getElementById("result").className = "active";
    document.getElementById("play").className = "inactive";
}

function restart() {
    document.getElementById("game_options").className = "active";
    document.getElementById("shot_options").className = "inactive";
    document.getElementById("result").className = "inactive";
    document.getElementById("play").className = "active";

    // Uncheck all buttons
    document.getElementById("rps").checked = false;
    document.getElementById("rpsls").checked = false;
    // Uncheck it and trigger the event for unchecking
    if (document.getElementById("opponent").checked) {
        document.getElementById("opponent").click();
    }
    document.getElementById("rock").checked = false;
    document.getElementById("paper").checked = false;
    document.getElementById("scissors").checked = false;
    document.getElementById("lizard").checked = false;
    document.getElementById("spock").checked = false;
}

function displayShots() {
    let rps_checked = document.getElementById("rps").checked;
    let rpsls_checked = document.getElementById("rpsls").checked;
    if (!rps_checked && !rpsls_checked) {
        alert("Please select a game mode before going to opponent mode.");
        document.getElementById("opponent").checked = false;
        throw new RangeError(`Must select game mode before going to opponent mode.`);
    }
    let shot_options = document.getElementById("shot_options");
    let opponent_checked = document.getElementById("opponent").checked;
    shot_options.className = opponent_checked ? "active" : "inactive";
}

function displayRPSLSOptions() {
    let rpsls_checked = document.getElementById("rpsls").checked;

    let rps_options = document.getElementsByName("rps_option");
    rps_options.forEach((rps_option) => {
        rps_option.className = "active";
    });

    let rpsls_options = document.getElementsByName("rpsls_option");
    rpsls_options.forEach((rpsls_option) => {
        rpsls_option.className = rpsls_checked ? "active" : "inactive";
    });
}
