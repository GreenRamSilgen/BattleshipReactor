import React from 'react';

export class Square extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            holdingShip: false,
        }


        this.clicked = this.clicked.bind(this);
    }


    clicked(e){
        if(this.props.playMode === false){
            if(this.state.holdingShip) return;
            this.props.placeShip(this.props.sqVal);
        }else{
            this.props.squareClicked(e.target.value);
        }
    }

    render(){
        return(
            <button className='square' onClick={this.clicked} value={this.props.sqVal}>
                {this.props.test}
            </button>
        );
    }
}