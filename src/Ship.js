let Ship = ({id,health,isVertical})=>{
    return {
        id,
        health,
        isVertical,
        loseOneHp:function(){
            this.health -= 1;
        },
        orientationChange:function(){
            this.isVertical = (this.isVertical) ? false : true;
        }
    }
}

export{Ship};