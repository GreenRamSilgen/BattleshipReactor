import React from 'react';

export class Square extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasShip: false,
        }
        
        this.ship = '';


        this.clicked = this.clicked.bind(this);
    }


    clicked(e){
        if(this.props.playMode === false){
            if(this.state.hasShip) return;
            if(this.props.placeShip(this.props.sqVal)){
                //this.setState({hasShip: true});
            }
        }else{
            this.props.squareClicked(e.target.value);
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            hasShip:nextProps.hasShip(this.props.sqVal)
        })
    }
    render(){
        return(
            <button className='square' onClick={this.clicked} value={this.props.sqVal}>
                {(this.state.hasShip) ? "SH" : this.props.sqVal}
            </button>
        );
    }
}