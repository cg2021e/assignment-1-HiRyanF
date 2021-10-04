export class glUtils{
    constructor(canvas){
        this.canvas = canvas;
        this.gl = null;
        this.programs = [];
        this.changeX = 0;
        this.changeY = 0;
        this.multiplier = 1;
        this.yChange = 0.0152;
    }

    checkWebGl(){
        try{
            this.gl = this.canvas.getContext('webgl');
        }catch(e){

        }

        if(!this.gl) alert('Your browser does not support WebGL rendering');

        return this.gl
    }

    addShape(shapes){
        this.shapes = shapes;
    }

    arrayBindBuffer(dataType, vertices, usage){
        let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new dataType(vertices), usage);
    }

    arrayInterpretation(program, size, dataType, aName, stride, offset){
        let attr = this.gl.getAttribLocation(program, aName);
        this.gl.vertexAttribPointer(attr, size, dataType, false, stride, offset);
        this.gl.enableVertexAttribArray(attr);
    }

    createProgram(vertexShader, fragmentShader){
        let program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader)
        this.gl.attachShader(program, fragmentShader)
        
        this.gl.linkProgram(program);
        this.programs.push(program);
        return program;
    }

    getShader(type, src){
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);
        
        return shader;
    }

    draw(){
        this.gl.clearColor(0.5, 0.8, 0.5, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        let program = this.programs[0];
        this.gl.useProgram(program);

        let shape = this.shapes[0];
        shape.verticesArr.forEach(vertices => {
            this.arrayBindBuffer(Float32Array,vertices.data,this.gl.STATIC_DRAW);
            this.arrayInterpretation(program, 2,  this.gl.FLOAT, "aPosition", 6 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.arrayInterpretation(program, 4,  this.gl.FLOAT, "aColor", 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
            this.gl.drawArrays(vertices.type, 0, vertices.data.length/6);
        });

        program = this.programs[1];
        this.gl.useProgram(program);

        shape = this.shapes[1];
        shape.setCenter(shape.centerX, shape.centerY + this.multiplier * this.yChange);

        shape.verticesArr.forEach(vertices => {
            this.arrayBindBuffer(Float32Array,vertices.data,this.gl.STATIC_DRAW);
            this.arrayInterpretation(program, 2,  this.gl.FLOAT, "aPosition", 6 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.arrayInterpretation(program, 4,  this.gl.FLOAT, "aColor", 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
            var uChange = this.gl.getUniformLocation(program, "uChange");
            this.changeY = this.changeY + this.multiplier * this.yChange;
            this.gl.uniform2f(uChange, this.changeX, this.changeY);
            this.gl.drawArrays(vertices.type, 0, vertices.data.length/6);
        });
        
        if(shape.isBounce()){
            this.multiplier = this.multiplier * -1;
        }
    }
}