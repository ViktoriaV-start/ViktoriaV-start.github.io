
class GameComputer extends Game {

  start() {
    let count = 1;

    let mark = (e) => {
      
      if (this.data.getCurrentPlayer() !== '0') {
        e.target.textContent = this.data.getCurrentPlayer();

        count++;
        e.target.removeEventListener('click', mark);
        this.data.setCurrentPlayer(this.data.getCurrentPlayer() === 'X' ? '0' : 'X');
        this.renderCurrentPlayer();

        // Проверить победу после хода игрока
        if (this.isCheckedVictory(count)) {
          for (let cell of this.cells) {
            cell.removeEventListener('click', mark);
            }
          return
        };

        // Ход компьютера
        let compChoice = this.getRandCell() ?? null;
        if (compChoice) {
          compChoice.textContent = this.data.getCurrentPlayer();
          count++;
          compChoice.removeEventListener('click', mark);
          this.data.setCurrentPlayer(this.data.getCurrentPlayer() === 'X' ? '0' : 'X');
          this.renderCurrentPlayer();
        }
      }

      // Проверить победу после хода компьютера
      if (this.isCheckedVictory(count)) {
        for (let cell of this.cells) {
          cell.removeEventListener('click', mark);
          }
        return
      };
    }

    // Если первый ход - компьютера
    if (this.data.getCurrentPlayer() === '0') {
      let compChoice = this.getRandCell() ?? null;
      if (compChoice) {
        compChoice.textContent = this.data.getCurrentPlayer();
        count++;
        compChoice.removeEventListener('click', mark);
        this.data.setCurrentPlayer(this.data.getCurrentPlayer() === 'X' ? '0' : 'X');
        this.renderCurrentPlayer();
      }
    }

    // Установить слушателей события на ячейки
    for (let cell of this.cells) {
      cell.addEventListener('click', mark);
    }
  }


  // Вернуть рандомную незанятую ячейку поля
  getRandCell() {
    let availableCell = [];
    for (let cell of this.cells) {
      if (!cell.textContent) availableCell.push(cell);
    }

    let randomNum = Math.floor(Math.random() * (availableCell.length));
    return availableCell[randomNum];
  }

  // Проверка победы, вывод информации на страницу, добавление в data победителю одного очка
  isCheckedVictory(count) {
    if (this.isVictory()) {
      let winner = this.data.getCurrentPlayer() === 'X' ? '0' : 'X';
        this.info.textContent = `Победитель - ${this.players[winner][0]}!`;
  
        this.players[winner][1]++;

      this.renderScore();
      this.info.classList.remove('hidden');
        return true;
    } else {
      if (count === 10) {
        this.info.textContent = 'Ничья!';
        this.info.classList.remove('hidden');
        return true;
      }
      return false;
    }
  }
}