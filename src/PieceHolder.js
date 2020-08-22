import React from 'react';
import './PieceHolder.css';
export class PieceHolder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shipOri : Array(10).fill(false,0),
        }
        this.getShipClass = this.getShipClass.bind(this);
        this.getShipImage = this.getShipImage.bind(this);
        this.changeOriState = this.changeOriState.bind(this);
    }

    
    getShipClass(id){
        let temp = id;
        if(id > 5) temp -= 5;

        switch(temp){
            case 1:
                return "btnDestroyer"
            case 2:
                return "btnBattleship"
            case 3:
                return "btnCruiser";
            case 4:
                return "btnCarrier";
            case 5: 
            return "btnSubmarine";
            default:
                return null;
        }
    }

        
    getShipImage(id){
        let temp = id;
        if(id > 5) temp -= 5;

        switch(temp){
            case 1:
                return (<img src='/assets/images/Destroyer.GIF' style={{visibility:"hidden"}} alt="Destroyer Ship"/>);
            case 2:
                return (<img src='/assets/images/Battleship.GIF' style={{visibility:"hidden"}} alt="Battleship"/>);
            case 3:
                return (<img src='/assets/images/Cruiser.GIF' style={{visibility:"hidden"}} alt="Cruiser Ship"/>);
            case 4:
                return (<img src='/assets/images/Carrier.GIF' style={{visibility:"hidden"}} alt="Aircraft Carrier Ship"/>);
            case 5: 
            return (<img src='/assets/images/Submarine.GIF' style={{visibility:"hidden"}} alt="Sumbmarine"/>);
            default:
                return null;
        }
    }

    changeOriState(event){
        let temp = [...this.state.shipOri];
        temp[event.target.value] = !temp[event.target.value];
        this.setState({
            shipOri: temp,
        })
        this.props.changeOrientation(event.target.value);
    }
    render(){
        return (
            <div>
            {(this.props.boardId === 1) ? "PLAYER 1's SHIPS" : "PLAYER 2's SHIPS"}
            {
                this.props.pieces.map((singleShip)=>{
                    return (
                        <div className="shipBtn" key={singleShip.id}>
                        <button  className={"shipImgBtn " + this.getShipClass(singleShip.id)} value={singleShip.id} onClick={this.props.pieceSelected}>{this.getShipImage(singleShip.id)}</button>
                        <button value={singleShip.id} onClick={this.changeOriState}>{(this.state.shipOri[singleShip.id]) ? "|" : "—"}</button>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}