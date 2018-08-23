import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.css']
})
export class BoardgameComponent implements OnInit {
  p1score: number;
  p2score: number;
  drawscore: number;
  currplayer: Player;
  displaymessage: string;
  constructor(private gs: GameService) { }

  ngOnInit() {
    this.gs.restart();
    this.p1score = this.gs.player1.score;
    this.p2score = this.gs.player2.score;
    this.drawscore = this.gs.draws;
    this.currplayer = this.gs.currentPlayer;
    this.displaymessage = this.gs.currentPlayer.shape + " move";
  }

  getCellValue(row: number, col: number) {
    // console.log(this.gs.getCell(row, col));
    return this.gs.getCell(row, col);
  }

  callBack() {
    if (this.gs.isThereWinner(this.gs.player1.shape)) {
      this.gs.player1.score += 1;
      this.p1score = this.gs.player1.score;
      this.displaymessage = this.gs.currentPlayer.shape + " win";
      console.log('player1 win');
      return;
    }

    if (this.gs.isThereWinner(this.gs.player2.shape)) {
      this.gs.player2.score += 1;
      this.p2score = this.gs.player2.score;
      this.displaymessage = this.gs.currentPlayer.shape + " win";
      console.log('player2 win');
      return;
    }

    if (this.gs.isDraw()) {
      this.gs.addDraws();
      this.drawscore = this.gs.draws;
      this.displaymessage = "its a draw";
      console.log('draw');
      return;
    }

    this.gs.changePlayer();
    this.displaymessage = this.gs.currentPlayer.shape + " move";
    this.currplayer = this.gs.currentPlayer;
  }

  reset() {
    this.gs.resetBoard();
    this.displaymessage = this.gs.currentPlayer.shape + " move";
  }
}
