import React from 'react';
import {Square} from './Square';
import './Board.css'

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.boardRowMaker = ['A','B','C','D','E','F','G','H'];
        this.boardColMaker = [1,2,3,4,5,6,7,8];
        this.gameBoard = this.createBoard();


        this.state={
            shipsAndLoc:{},
            squaresWithShips: [],
        }


        this.createBoard = this.createBoard.bind(this);


        //PLAY MODE 
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.hitShip = this.hitShip.bind(this);
        //PLAY MODE END


        //PLACE SHIP MODE
        this.handlePlaceShip = this.handlePlaceShip.bind(this);
        this.verticalPlacementIsValid = this.verticalPlacementIsValid.bind(this);
        this.horizantalPlacementIsValid = this.horizantalPlacementIsValid.bind(this);
        this.sqHasShip = this.sqHasShip.bind(this);
        this.placementPossible = this.placementPossible.bind(this);
        //PLACE SHIP MODE END

        this.customCheck = this.customCheck.bind(this);
        this.updateSquareShipState = this.updateSquareShipState.bind(this);
    }
    createBoard(){
        let board=[];
        for(let r = 0; r < 8; r++){
            let col=[];
            for(let c = 0; c < 8; c++){
                col.push(`${r+1}${c+1}`);
            }
            board.push(col);
        }
        return board;
    }
    
    //find all helpers in PLAY MODE helper section
    handleSquareClick(value){
        if(this.props.gameOver) return;
        if(this.props.isP1Turn){
            if(this.props.boardId === 2){
                this.props.changeTurn();
                let hitVal = this.hitShip(value); 
                return {bId:this.props.boardId, hit:hitVal};

            }
        }else{
            if(this.props.boardId === 1){
                this.props.changeTurn();
                let hitVal = this.hitShip(value);
                return {bId:this.props.boardId, hit:hitVal};
                
            }
        }
        
    }

    //find all helpers in PLACE MODE helper section
    handlePlaceShip(sqVal){
        //player 1 can only place their pieces on board 1. 
        if(this.props.isP1Turn && this.props.boardId===2 && this.props.selectedShip.id <= 5) return;
        //player 2 can only place their pieces on board 2.
        if(this.props.isP1Turn && this.props.boardId===1 && this.props.selectedShip.id > 5) return;
        
        if(this.props.selectedShip.isVertical){
            if(this.verticalPlacementIsValid(sqVal)){
                if(this.placementPossible(sqVal))
                {
                    console.log(this.state.shipsAndLoc);
                let tempShipAndLoc = this.state.shipsAndLoc;
                tempShipAndLoc[this.props.selectedShip.id]=[];
                
                for(let i = 0; i < this.props.selectedShip.health; i++){
                    tempShipAndLoc[this.props.selectedShip.id].push(Number(`${Number(sqVal.charAt(0))+i}${sqVal.charAt(1)}`));
                }
                this.setState({
                    shipsAndLoc: tempShipAndLoc,
                    squaresWithShips: this.updateSquareShipState(tempShipAndLoc),
                });
                }
            }else{
                console.log("VERTICAL NOT VALID");
            }
        }
        else{
            
            if(this.horizantalPlacementIsValid(sqVal)){
                if(this.placementPossible(sqVal))
                {
                console.log(this.state.shipsAndLoc);
                let tempShipAndLoc = this.state.shipsAndLoc;
                tempShipAndLoc[this.props.selectedShip.id]=[];
                for(let i = 0; i < this.props.selectedShip.health; i++){
                    tempShipAndLoc[this.props.selectedShip.id].push(Number(`${sqVal.charAt(0)}${Number(sqVal.charAt(1))+i}`));
                }
                this.setState({
                    shipsAndLoc: tempShipAndLoc,
                    squaresWithShips: this.updateSquareShipState(tempShipAndLoc),
                });
                }
            }else{
                console.log("Horizantal NOT VALID");
            }
        }
    }

    //!PLACE MODE HELPERS
    verticalPlacementIsValid(sqVal){
        return (Number(sqVal.charAt(0))+this.props.selectedShip.health -1 <= 8) ? true:false;
    }
    horizantalPlacementIsValid(sqVal){
        return (Number(sqVal.charAt(1))+this.props.selectedShip.health -1 <= 8) ? true : false;
    }

    sqHasShip(loc){
        for(let ship in this.state.shipsAndLoc){
            for(let squareValue in this.state.shipsAndLoc[ship]){
                
                if(this.state.shipsAndLoc[ship][squareValue] === loc){
                    return true;
                }
            }
        }
        return false;
    }

    placementPossible(loc){
        let possible = true;
        if(this.props.selectedShip.isVertical){
            for(let i = 0; i < this.props.selectedShip.health;i++){
                if(this.sqHasShip(Number(`${Number(loc.charAt(0))+i}${loc.charAt(1)}`))) possible= false;
            }
        }
        else{
            for(let i = 0; i < this.props.selectedShip.health;i++){
                if(this.sqHasShip(Number(`${loc.charAt(0)}${Number(loc.charAt(1))+i}`))) possible=false;
            }
        }
        return possible;
    }

    customCheck(colVal){
        for(let val in this.state.squaresWithShips){
            if(Number(colVal) === this.state.squaresWithShips[val]) return true;
        }
        return false;
    }

    updateSquareShipState(newshipAndLoc){
        let arr = [];
        for(let ship in newshipAndLoc){
            for(let squareValue in newshipAndLoc[ship]){
                arr.push(newshipAndLoc[ship][squareValue]);
            }
        }
        return arr;
    }
    //!PLACEMODE HELPERS END

    //!PLAY MODE HELPERS 
    hitShip(val){
        for(let i in this.state.squaresWithShips){
            if(Number(this.state.squaresWithShips[i]) === Number(val)){
                let temp = [...this.state.squaresWithShips];
                if(temp.length === 1){
                    //TODO: TRIGGER WIN HERE
                    (this.props.boardId === 1) ? this.props.setWinner(2) : this.props.setWinner(1);
                }
                temp.splice(i,1);
                this.setState({
                    squaresWithShips: temp,
                })
                return true;
            }
        }
        return false;
    }
    
    //!PLAY MODE HELPERS END
    render(){
        return(
            <div className="boardGrid">

            {this.gameBoard.map((gbRow) =>{
                return gbRow.map((colVal)=>{
                    if(this.customCheck(colVal))
                    {              
                        //console.log("hasShip " + colVal)
                        return <Square boardId={this.props.boardId} key={colVal} sqVal={colVal} currentShip={this.props.selectedShip} squareClicked={this.handleSquareClick} placeShip={this.handlePlaceShip} playMode={this.props.playMode} hasShip={this.sqHasShip(colVal)} test="SHIP"/>
                    }
                    else{
                        //console.log("inhere" + colVal)
                        return <Square boardId={this.props.boardId} key={colVal} sqVal={colVal} currentShip={this.props.selectedShip} squareClicked={this.handleSquareClick} placeShip={this.handlePlaceShip} playMode={this.props.playMode} hasShip={this.sqHasShip(colVal)} test="NOSHIP"/>
                    }
                })
            })}
            </div>
        );
    }
}