

class GameStorage extends Game {

  storage = localStorage.tictac;
  storedGame = JSON.parse(localStorage.tictac);
  count = Object.values(this.storedGame.currentGame).reduce((acc, el) => el ? ++acc : acc, 0) + 1;

  init() {
    //this.data.setCurrentPlayer((this.data.getCounter() & 1) ? 'X' : '0');
    this.render();
    this.renderGameCounter();
    this.renderCurrentPlayer();
    this.renderScore();
    this.cells = document.querySelectorAll('.field__cell');

    //  Если была сохранена игра с победой
    if (this.isVictory()) {
      // Определить победителя
      let winner = this.data.getCurrentPlayer() === 'X' ? '0' : 'X';
      
      this.info.textContent = `Победитель - ${this.players[winner][0]}!`;

      this.renderScore();
      this.info.classList.remove('hidden');
    } else if ((Object.values(this.storedGame.currentGame).reduce((acc, el) => el ? ++acc : acc, 0) + 1) === 10) {
        this.info.textContent = 'Ничья!';
        this.info.classList.remove('hidden');
    } else {
      this.start();
    }
  }

  render() {

      this.storedGame = JSON.parse(localStorage.tictac);

      this.data.setCounter(this.storedGame.counter);
      this.data.setPlayers(this.storedGame.players);
      this.data.setCurrentPlayer(this.storedGame.currentPlayer);
      this.players = this.data.getPlayers();

      this.main.insertAdjacentHTML('beforeend', this.markUpField(this.storedGame.currentGame));
  }

  markUpField(currentGame) {
    let field = '';
    for (let i = 1; i < 10; i++) {
      field += `<div class='field__cell' data-id="${i}">${currentGame[i]}</div>`
    }
    return field;
  }

  start() {

    const mark = (e) => {

      e.target.textContent = this.data.getCurrentPlayer();
  
      this.count++;
      e.target.removeEventListener('click', mark);
      this.data.setCurrentPlayer(this.data.getCurrentPlayer() === 'X' ? '0' : 'X');
      this.renderCurrentPlayer();
  
      if (this.isVictory()) {
        this.info.textContent = `Победитель - ${this.players[e.target.textContent][0]}!`;
  
        this.players[e.target.textContent][1]++;
  
        this.renderScore();
        this.info.classList.remove('hidden');
  
        for (let cell of game.cells) {
          cell.removeEventListener('click', mark);
          }
      } else {
        if (this.count === 10) {
          this.info.textContent = 'Ничья!';
          this.info.classList.remove('hidden');
        }
      }
    }

    for (let cell of this.cells) {
      if (!cell.textContent) {
        cell.addEventListener('click', mark);
      }
    }
  }

  renderScore() {
    this.scoreX.textContent = this.players.X[1];
    this.score0.textContent = this.players['0'][1];
  }

}
