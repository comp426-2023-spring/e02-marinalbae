// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

    let player1Choice;
    let player2Choice;
    let choices;
    let player2;

    function play(choice) {
      player1Choice = choice;
      
      const mode = document.querySelector('input[name="mode"]:checked').value;
      
      if (mode === 'computer') {
        playAgainstComputer();
      } else {
        document.getElementById('player2-moves').style.display = 'block';
        document.getElementById('player2-buttons').style.display = 'block';
      }
    }

    function playAgainstComputer() {
      let rps_checked = document.getElementById("rps").checked;
      let rpsls_checked = document.getElementById("rpsls").checked;
      let mode = rps_checked ? "rps" : "rpsls"

      choices = getChoices(mode);
      player2Choice = choices[Math.floor(Math.random() * choices.length)];
      player2 = "Computer";

      document.getElementById('computer-choice').innerText = 'Computer Chose: ' + player2Choice;
      document.getElementById('computer-choice').style.display = 'block';
      determineWinner();
    }

    function setPlayer2Choice(choice) {
      player2Choice = choice;
      player2 = "Player 2"
      
      document.getElementById('player2-choice').innerText = 'Player 2 Chose: ' + choice;
      document.getElementById('player2-choice').style.display = 'block';
      determineWinner();
    }

    function determineWinner() {
	document.getElementById('player1-choice').innerText = 'Player 1 Chose: ' + player1Choice;
        document.getElementById('player1-choice').style.display = 'block';

        let rps_checked = document.getElementById("rps").checked;
        let rpsls_checked = document.getElementById("rpsls").checked;

        let mode = rps_checked ? "rps" : "rpsls"
        
        let api = `${document.baseURI}app/${mode}/play/${player1Choice}`;
	
//	await fetch(api)
//        .then(function(response) {
//            return response.json();
//        })
//            .then(function(result) {
//                console.log(result)
//		document.getElementById('result').innerText = result.result;
//		      });

//	I couldn't get the URL to work so I hard coded the results.

        if (player1Choice === player2Choice) {
          document.getElementById('result').innerText = 'It\'s a tie!';
        } else {
          const winningChoices = {
          'rock': ['scissors', 'lizard'],
          'paper': ['rock', 'spock'],
          'scissors': ['paper', 'lizard'],
          'lizard': ['paper', 'spock'],
          'spock': ['rock', 'scissors']
        };

        if (winningChoices[player1Choice].includes(player2Choice)) {
          document.getElementById('result').innerText = 'Player 1 wins!';
        } else {
          document.getElementById('result').innerText = player2 + ' wins!';
        }
      }
    }

    function resetGame() {
      document.getElementById('computer-choice').style.display = 'none';
      document.getElementById('player2-buttons').style.display = 'none';
      document.getElementById('player2-moves').style.display = 'none';
      document.getElementById('result').innerText = '';
      document.getElementById('player1-choice').innerText = '';
      document.getElementById('player2-choice').innerText = '';

      updateChoices();
    }

    function updateChoices() {
      let rps_checked = document.getElementById("rps").checked;
      let rpsls_checked = document.getElementById("rpsls").checked;
      let mode = rps_checked ? "rps" : "rpsls"
      choices = getChoices(mode);

      document.getElementById('choices').innerHTML = choices.map(choice => {
        return `<button onclick="play('${choice}')">${choice.charAt(0).toUpperCase() + choice.slice(1)}</button>`;
      }).join('');

      document.getElementById('player2-buttons').innerHTML = choices.map(choice => {
        return `<button onclick="setPlayer2Choice('${choice}')">${choice.charAt(0).toUpperCase() + choice.slice(1)}</button>`;
      }).join('');
    }

    function getChoices(gameVariant) {
      if (gameVariant === 'rpsls') {
        return ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      }
      return ['rock', 'paper', 'scissors'];
    }

    document.querySelectorAll('input[name="game"]').forEach(input => {
      input.addEventListener('change', updateChoices);
    });

    updateChoices();
