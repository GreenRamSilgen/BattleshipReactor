import React from 'react';
import {Board} from './Board';
import {PieceHolder} from './PieceHolder';
import {Ship} from './Ship';

export class GameManager extends React.Component{
    constructor(props){
        super(props);
        this.selectedPiece = '';
        this.p1Ships = this.getAllShips(0);
        this.p2Ships = this.getAllShips(5);
        

        this.selectPiece = this.selectPiece.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
        this.getAllShips = this.getAllShips.bind(this);
    }

    selectPiece(event){
        let shipId = event.target.value;
        if(shipId >5){ //player 2
            this.selectedPiece = this.p2Ships[shipId-6];
        }
        else{//player 1
            this.selectedPiece = this.p1Ships[shipId-1];
        }
    }
    changeOrientation(event){
        let shipId = event.target.value;
        if(shipId >5){ //player 2
            this.p2Ships[shipId-6].orientationChange();
        }
        else{//player 1
            this.p1Ships[shipId-1].orientationChange();
        }
    }

    getAllShips(val){
        let arr = [];
        arr.push(Ship({id:1+val,health:5,isVertical:false}));//Carrier
        arr.push(Ship({id:2+val,health:4,isVertical:false}));//Battleship
        arr.push(Ship({id:3+val,health:3,isVertical:false}));//Cruiser
        arr.push(Ship({id:4+val,health:3,isVertical:false}));//Submarine
        arr.push(Ship({id:5+val,health:2,isVertical:false}));//Destroyer
        return arr;
    }
    render(){
        return(
            <div>
            <PieceHolder pieceSelected={this.selectPiece} pieces={this.p1Ships} changeOrientation={this.changeOrientation}/>
                <Board />
            </div>
        );
    }
}