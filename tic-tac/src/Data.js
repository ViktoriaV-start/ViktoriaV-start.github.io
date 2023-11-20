
class Data {
  gameCounter = 1;

  // Названия игроков и счет
    players = {
    'X': ['Первый игрок', 0],
    '0': ['Второй игрок', 0],
    };
  
    currentPlayer = 'X';

  constructor (gameCounter = this.gameCounter, players = this.players, currentPlayer = this.currentPlayer) {
    this.gameCounter = gameCounter;
    this.players = players;
    this.currentPlayer = currentPlayer;
  }

  getCounter() {
    return this.gameCounter;
  }

  getPlayers() {
    return this.players;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setPlayers(value) {
    this.players = value;
  }

  setCounter(value) {
    this.gameCounter = value;
  }

  setCurrentPlayer(value) {
    this.currentPlayer = value;
  }

}
