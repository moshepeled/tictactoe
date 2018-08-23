import { Injectable } from '@angular/core';
import { Player } from '../models/Player';
import { Cell } from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player1: Player;
  player2: Player;
  currentPlayer: Player;
  boardGame: Cell[] = [];
  steps: number;
  draws: number;
  constructor() {
    this.restart();
  }

  restart() {
    this.resetPlayers();
    this.resetBoard();
    // this.chkboard();
  }

  resetPlayers() {
    this.player1 = new Player('player1', 0, 'X');
    this.player2 = new Player('player2', 0, 'O');
    this.draws = 0;
    this.currentPlayer = this.player1;
  }

  resetBoard() {
    this.steps = 0;
    this.currentPlayer = this.player1;
    this.boardGame = [];
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 2; col++) {
        this.boardGame.push(new Cell(row, col, ''));
      }
    }
  }

  setGamefinish() {
    let emptyCell = this.boardGame
      .filter(cell => cell.shape === '');
    emptyCell.forEach(element => {
      element.shape = ' ';
    })
  }

  isDraw() {
    return this.steps === (9 - 1);
  }

  addDraws() {
    this.draws += 1;
  }

  isThereWinner(shape) {
    for (let inx = 0; inx <= 2; inx++) {
        // horizontal
        if (this.boardGame
          .filter(cell => cell.column === inx)
          .filter(cell => cell.shape === shape).length === 3) {
          this.setGamefinish();
          return true;
        }
        // vertical
        if (this.boardGame
          .filter(cell => cell.row === inx)
          .filter(cell => cell.shape === shape).length === 3) {
          this.setGamefinish();
          return true;
        }
    }
    // cross left-right (0,0) - (1,1) - (2,2)
    if (this.boardGame
      .filter(col => col.row === col.column)
      .filter(cell => cell.shape === shape).length === 3) {
      this.setGamefinish();
      return true;
    }
    // cross right-left (0,2) - (1,1) - (2,0)
    if (this.boardGame.filter(col => col.row + col.column === 2)
      .filter(cell => cell.shape === shape).length === 3) {
      this.setGamefinish();
      return true;
    }
    return false;
  }

  getCell(row: number, col: number) {
    return this.boardGame.find(item => item.column === col && item.row === row)
  }

  getPlayer() {
    return this.currentPlayer;
  }

  changePlayer() {
    if (this.currentPlayer.shape === this.player1.shape) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    this.steps += 1;
  }

}
