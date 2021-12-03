export class glUtils{
    static yChangeRightSide = 0.0152;
    constructor(canvas){
        this.canvas = canvas;
        this.gl = null;
        this.program = null;
    }

    checkWebGl(){
        try{
            this.gl = this.canvas.getContext('webgl');
        }catch(e){

        }

        if(!this.gl) alert('Your browser does not support WebGL rendering');

        return this.gl
    }

    arrayBindBuffer(target, dataType, data, usage){
        let buffer = this.gl.createBuffer();
        this.gl.bindBuffer(target, buffer);
        this.gl.bufferData(target, new dataType(data), usage);
        return buffer;
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

}