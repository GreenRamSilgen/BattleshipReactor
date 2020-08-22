import React from 'react';
import {Board} from './Board';
import {PieceHolder} from './PieceHolder';
import {Ship} from './Ship';
import './GameManager.css';


export class GameManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedPiece: '',
            p1Turn: true,
            playMode: false,
            winner: '',
        }
        this.p1Ships = this.getAllShips(0);
        this.p2Ships = this.getAllShips(5);
        
        

        this.selectPiece = this.selectPiece.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
        this.getAllShips = this.getAllShips.bind(this);
        this.startGame = this.startGame.bind(this);
        this.changeTurn = this.changeTurn.bind(this);
        this.updateWinner = this.updateWinner.bind(this);
    }

    selectPiece(event){
        let shipId = event.target.value;
        console.log(shipId);
        if(shipId >5){ //player 2
            this.setState({
                selectedPiece: this.p2Ships[shipId-6]
            });
            //this.selectedPiece = this.p2Ships[shipId-6];
        }
        else{//player 1
            this.setState({
                selectedPiece: this.p1Ships[shipId-1]
            });
            // this.selectedPiece = this.p1Ships[shipId-1];
        }
    }
    changeOrientation(shipId){
        
        if(shipId >5){ //player 2
            this.p2Ships[shipId-6].orientationChange();
        }
        else{//player 1
            this.p1Ships[shipId-1].orientationChange();
        }
    }

    getAllShips(val){
        let arr = [];
        arr.push(Ship({id:1+val,health:5,isVertical:false}));//Destroyer
        arr.push(Ship({id:2+val,health:4,isVertical:false}));//Battleship
        arr.push(Ship({id:3+val,health:3,isVertical:false}));//Cruiser
        arr.push(Ship({id:4+val,health:3,isVertical:false}));//Carrier
        arr.push(Ship({id:5+val,health:2,isVertical:false}));//Submarine
        return arr;
    }


    startGame(){
        this.setState({
            playMode: true,
        });
    }

    changeTurn(){
        this.setState({
            p1Turn: !this.state.p1Turn,
        })
    }

    updateWinner(player){
        this.setState({
            winner: player
        })
    }
    render(){
        return(
            <div className="game">
            {(this.state.winner) ? "PLAYER " + this.state.winner + " WINS!" : null}
            
            <div className="p1Board">
                {(this.state.playMode) ? null : <PieceHolder boardId={1} pieceSelected={this.selectPiece} pieces={this.p1Ships} changeOrientation={this.changeOrientation} />} 
                <Board boardId={1} selectedShip={this.state.selectedPiece} isP1Turn={this.state.p1Turn} playMode={this.state.playMode} changeTurn={this.changeTurn} setWinner={this.updateWinner} gameOver={this.state.winner}/>
            </div>
            <div className="p2Board">
                {(this.state.playMode) ? null : <PieceHolder boardId={2} pieceSelected={this.selectPiece} pieces={this.p2Ships} changeOrientation={this.changeOrientation} />}
                <Board boardId={2} selectedShip={this.state.selectedPiece} isP1Turn={this.state.p1Turn} playMode={this.state.playMode} changeTurn={this.changeTurn} setWinner={this.updateWinner} gameOver={this.state.winner}/>
            </div>
            <button onClick={this.startGame}>Start</button>
            </div>
        );
    }
}