import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../data/game.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares : any[]  = Array(9).fill(null);
  xIsNext: boolean = true;
  winner: string | undefined;

  game: Game | null;

  constructor(private readonly gameService: GameService) { 
    this.game = null;
  }

  ngOnInit(): void {
    
    console.log("inside ngOnInit()");
    this.newGame();
  }
  newGame() {
    
    console.log("start newGame()");
    this.squares = Array(9).fill(null);
    this.winner = undefined;
    this.xIsNext = true;

    // Call the service to get a new game
    this.gameService.getNewGame(1, 2).subscribe((game) => {
      
      console.log("inside service getNewGame() cal");
      this.game = game;

      console.log(this.game);
      if(this.game){
        console.log(`GameId = ${this.game.GameID}`);
        console.log(`PlayerOneId = ${this.game.PlayerOneID}`);
        console.log(`PlayerTwoId = ${this.game.PlayerTwoID}`);
        console.log(`BoardSpaces = ${this.game.BoardSpaces}`);
        console.log(`WinnerId = ${this.game.WinnerID}`);
      }
      
    });
  }
  get player(){
    return this.xIsNext ? 'X':'O';
  }

  makeMove(idx: number){
    console.log("inside makeMove()");

    console.log(this.game);
    if(this.game){
      console.log(`GameId = ${this.game.GameID}`);
      console.log(`PlayerOneId = ${this.game.PlayerOneID}`);
      console.log(`PlayerTwoId = ${this.game.PlayerTwoID}`);
      console.log(`BoardSpaces = ${this.game.BoardSpaces}`);
      console.log(`WinnerId = ${this.game.WinnerID}`);
    }

    if(this.winner){
      return;
    }

    if(!this.game || this.game.WinnerID){
      return;
    }

    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;

      this.winner = this.calculateWinner();
    }

    if(!this.game.BoardSpaces[idx]){
      const playerId = this.xIsNext ? this.game.PlayerOneID:this.game.PlayerTwoID;

      this.gameService.makeMove(this.game.GameID, idx, playerId).subscribe((game) => {
      console.log("inside makeMove (inside call to service (before the = ))");
      console.log(this.game);
        this.game = game;
      });

      console.log("inside makeMove (after call to service)");
      console.log(this.game);
      
      this.xIsNext = !this.xIsNext;
      
      this.winner = this.calculateWinner();
    }

    console.log("inside service getNewGame() end of function");
    if(!this.xIsNext){
      this.computerMove();
    }
  }
  calculateWinner(): string | undefined {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if(
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ){
        return this.squares[a];
      }
    }
    return undefined;
  }
  computerMove(){
    // select a random square
    let num = Math.random() * 8;
    num = Math.floor(num);
    this.makeMove(num);
  }
}
