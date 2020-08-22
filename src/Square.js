import React from 'react';

export class Square extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            holdingShip: false,
            hitWithShip: false,
            clicked: false,
        }


        this.clicked = this.clicked.bind(this);
    }


    clicked(e){
        if(this.props.playMode === false){
            if(this.state.holdingShip) return;
            this.props.placeShip(this.props.sqVal);
        }else{
            if(this.state.clicked) return;
            let res = this.props.squareClicked(e.target.value)
            if(res === undefined) return;
            if(Number(res.bId) === Number(this.props.boardId)){
            this.setState({
                hitWithShip: res.hit,
                clicked: true,
            });
            }
        }
    }

    render(){
        let sqCl = '';
        if(this.props.playMode === false){
            sqCl = this.props.sqClass;
            
        }else{
            if(this.state.clicked){
                sqCl = (this.state.hitWithShip) ? "shipHit" : "shipMiss";
            }
        }
        return(
            <button className={'square ' + sqCl} onClick={this.clicked} value={this.props.sqVal}>
                
            </button>
        );
    }
}