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


        this.createBoard = this.createBoard.bind(this);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.handlePlaceShip = this.handlePlaceShip.bind(this);
        this.verticalPlacementIsValid = this.verticalPlacementIsValid.bind(this);
        this.horizantalPlacementIsValid = this.horizantalPlacementIsValid.bind(this);
        this.sqHasShip = this.sqHasShip.bind(this);
        this.placementPossible = this.placementPossible.bind(this);
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
                this.setState({shipsAndLoc: tempShipAndLoc});
                
                return true;
                }
                return false;
            }else{
                console.log("VERTICAL NOT VALID");
                return false;
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
                this.setState({shipsAndLoc: tempShipAndLoc});

                
                return true;
                }
                return false;
            }else{
                console.log("Horizantal NOT VALID");
                return false;
            }
        }
    }


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

    
    render(){
        return(
            <div className="boardGrid">

            {this.gameBoard.map((gbRow) =>{
                return gbRow.map((colVal)=>{
                    return <Square key={colVal} sqVal={colVal} currentShip={this.props.selectedShip} squareClicked={this.handleSquareClick} placeShip={this.handlePlaceShip} playMode={false} hasShip={this.sqHasShip}/>
                })
            })}
            </div>
        );
    }
}