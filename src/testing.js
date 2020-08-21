import {Ship} from './Ship';
function getAllShips(val){
        let arr = [];
        arr.push(Ship({id:1+val,health:5,isVertical:false}));//Carrier
        arr.push(Ship({id:2+val,health:4,isVertical:false}));//Battleship
        arr.push(Ship({id:3+val,health:3,isVertical:false}));//Cruiser
        arr.push(Ship({id:4+val,health:3,isVertical:false}));//Submarine
        arr.push(Ship({id:5+val,health:2,isVertical:true}));//Destroyer
        return arr;
}

let ships = getAllShips(0);
let selectedShip = ships[4];
let shipAndLoc = {
        1:[84,85,86,87,88],
        4:[11,12,13],
}

function placementPossible(loc){
        for(let i = 0; i < selectedShip.length;i++){
                let currLoc = loc.charAt(0)+1
                for(let idx in shipAndLoc){
                        console.log(shipAndLoc[idx]);
                        for(let i = 0; i < shipAndLoc[idx].length; i++){
                                console.log(shipAndLoc[idx][i]);
                        }
                }
        }
}
export{placementPossible};