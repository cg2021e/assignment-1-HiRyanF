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

    isBounce(yCenterPos){
        if(yCenterPos + this.height/2 >= 1 || yCenterPos - this.height/2 <= -1){
            return true;
        }
        return false;
    }
}