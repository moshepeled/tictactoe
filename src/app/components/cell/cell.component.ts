import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../models/cell';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;
  @Output() cellClick = new EventEmitter();
  
  constructor(private gs: GameService) { }

  ngOnInit() {
  }

  onClick() {
    if (this.cell.shape !== '') {
      return;
    }
    this.cell.shape = this.gs.getPlayer().shape;
    // this.gs.changePlayer();
    // console.log('after change ' + this.gs.getPlayer().shape);
    this.cellClick.emit();
  }

}
