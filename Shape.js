export class Shape{
    constructor(){
        this.verticesArr = [];
    }

    addVertices(vertices){
        this.verticesArr.push(vertices);
    }

    setCenter(centerX,centerY){
        this.centerX = centerX;
        this.centerY = centerY;
    }

    setSize(width, height){
        this.width = width;
        this.height = height;
    }

    isBounce(){
        if(this.centerY + this.height/2 >= 1 || this.centerY - this.height/2 <= -1){
            return true;
        }
        return false;
    }
}