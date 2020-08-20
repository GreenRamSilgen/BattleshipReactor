import React from 'react';

export class PieceHolder extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
            {
                this.props.pieces.map((singleShip)=>{
                    console.log(singleShip);
                    return (
                        <div className="shipBtn" key={singleShip.id}>
                        <button  value={singleShip.id} onClick={this.props.pieceSelected}>Ship {singleShip.id}</button>
                        <button value={singleShip.id} onClick={this.props.changeOrientation}>Orientation</button>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}