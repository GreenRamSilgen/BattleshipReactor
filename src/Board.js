import React from 'react';
import {Square} from './Square';
import {Ship} from './Ship';
import './Board.css'

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.boardRowMaker = ['A','B','C','D','E','F','G','H'];
        this.boardColMaker = [1,2,3,4,5,6,7,8];
        this.gameBoard = this.createBoard();


        this.state={
            shipsAndLoc:{},
        }
        
        
        this.selectedShip = Ship({id:1,health:2,isVertical:true});
        this.tempFakeShip = Ship({id:2,health:3,idVertical:true});


        this.createBoard = this.createBoard.bind(this);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.handlePlaceShip = this.handlePlaceShip.bind(this);
        this.verticalPlacementIsValid = this.verticalPlacementIsValid.bind(this);
        this.horizantalPlacementIsValid = this.horizantalPlacementIsValid.bind(this);
        this.sqHasShip = this.sqHasShip.bind(this);
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
    
    handleSquareClick(value){
        console.log(value);
    }
    handlePlaceShip(sqVal){
        if(this.selectedShip.isVertical){
            if(this.verticalPlacementIsValid(sqVal)){
                let tempShipAndLoc = this.state.shipsAndLoc;
                tempShipAndLoc[this.selectedShip.id]=[];
                
                for(let i = 0; i < this.selectedShip.health; i++){
                    tempShipAndLoc[this.selectedShip.id].push(`${Number(sqVal.charAt(0))+i}${sqVal.charAt(1)}`);
                }
                this.setState({shipsAndLoc: tempShipAndLoc});
                console.log(this.state.shipsAndLoc);
                return true;
            }else{
                console.log("VERTICAL NOT VALID");
                return false;
            }
        }
        else{
            
            if(this.horizantalPlacementIsValid(sqVal)){
                let tempShipAndLoc = this.state.shipsAndLoc;
                tempShipAndLoc[this.selectedShip.id]=[];
                for(let i = 0; i < this.selectedShip.health; i++){
                    tempShipAndLoc[this.selectedShip.id].push(`${sqVal.charAt(0)}${Number(sqVal.charAt(1))+i}`);
                }
                this.setState({shipsAndLoc: tempShipAndLoc});

                console.log(this.state.shipsAndLoc);
                return true;
            }else{
                console.log("Horizantal NOT VALID");
                return false;
            }
        }
    }


    verticalPlacementIsValid(sqVal){
        return (Number(sqVal.charAt(0))+this.selectedShip.health -1 <= 8) ? true:false;
    }
    horizantalPlacementIsValid(sqVal){
        return (Number(sqVal.charAt(1))+this.selectedShip.health -1 <= 8) ? true : false;
    }

    sqHasShip(loc){
        let hasIt = false;
        for(let ship in this.state.shipsAndLoc){
            for(let squareValue in this.state.shipsAndLoc[ship]){
                if(this.state.shipsAndLoc[ship][squareValue] === loc){
                    console.log(this.state.shipsAndLoc[ship][squareValue]);
                    console.log("loc"+ loc);
                    return true;
                }
            }
        }
        return false;
        // console.log(typeof loc);
        // for(let sh in this.state.shipsAndLoc){
        //     console.log(sh);
        //     if(this.state.shipsAndLoc[sh].includes(loc)){
        //         console.log("INNER"); 
        //         return true
        //     };
        // }
    }


    render(){
        return(
            <div className="boardGrid">

            {this.gameBoard.map((gbRow) =>{
                return gbRow.map((colVal)=>{
                    return <Square key={colVal} sqVal={colVal} currentShip={this.selectedShip} squareClicked={this.handleSquareClick} placeShip={this.handlePlaceShip} playMode={false} hasShip={this.sqHasShip}/>
                })
            })}
            </div>
        );
    }
}