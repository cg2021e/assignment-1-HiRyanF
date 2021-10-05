export class glUtils{
    static yChangeRightSide = 0.0152;
    constructor(canvas){
        this.canvas = canvas;
        this.gl = null;
        this.program = null;
        this.changeYRightSide = 0;
        this.multiplier = 1;
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

    arrayInterpretation(program, size, dataType, aName, stride, offset){// Teach computer how to collect data from ArrayBuffer
        let attr = this.gl.getAttribLocation(program, aName);
        this.gl.vertexAttribPointer(attr, size, dataType, false, stride, offset);
        this.gl.enableVertexAttribArray(attr);
    }

    createProgram(vertexShader, fragmentShader){
        // Prepare a .exe shell (shader program)
        let program = this.gl.createProgram();

        // Put the two .o files into the shell
        this.gl.attachShader(program, vertexShader)
        this.gl.attachShader(program, fragmentShader)
        
        // Link the two .o files, so together they can be a runnable program/context.
        this.gl.linkProgram(program);
        this.program = program;
        return this.program;
    }

    getShader(type, src){
        // Create .c in GPU
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, src);

        // Compile .c into .o
        this.gl.compileShader(shader);
        
        return shader;
    }

    draw(){
        this.gl.clearColor(0.5, 0.8, 0.5, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        //Left Side
        let shape = this.shapes[0];
        let uChange = this.gl.getUniformLocation(this.program, "uChange");
        this.gl.uniform2f(uChange, 0, 0);
        shape.verticesArr.forEach(vertices => {
            this.arrayBindBuffer(Float32Array,vertices.data,this.gl.STATIC_DRAW);
            this.arrayInterpretation(this.program, 2,  this.gl.FLOAT, "aPosition", 6 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.arrayInterpretation(this.program, 4,  this.gl.FLOAT, "aColor", 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
            this.gl.drawArrays(vertices.type, 0, vertices.data.length/6);
        });


        //Right Side
        shape = this.shapes[1];
        shape.setCenter(shape.centerX, shape.centerY + this.multiplier * glUtils.yChangeRightSide);
        this.changeYRightSide = this.changeYRightSide + this.multiplier * glUtils.yChangeRightSide;
        uChange = this.gl.getUniformLocation(this.program, "uChange");
        this.gl.uniform2f(uChange, 0, this.changeYRightSide);

        shape.verticesArr.forEach(vertices => {
            this.arrayBindBuffer(Float32Array,vertices.data,this.gl.STATIC_DRAW);
            this.arrayInterpretation(this.program, 2,  this.gl.FLOAT, "aPosition", 6 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.arrayInterpretation(this.program, 4,  this.gl.FLOAT, "aColor", 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
                    
            this.gl.drawArrays(vertices.type, 0, vertices.data.length/6);
        });

        if(shape.isBounce(shape.centerY + this.multiplier * glUtils.yChangeRightSide)){
            this.multiplier = this.multiplier * -1;
        }
    }
}