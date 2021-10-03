import {glUtils} from './glUtils.js';
import { Vertices } from './Vertices.js';
import { Shape } from './Shape.js';

window.onload = () => {
    main();
}

let utils;

function main(){
    let canvas = document.getElementById('myCanvas');
    utils = new glUtils(canvas);

    /** @type {WebGLRenderingContext} */
    let gl = utils.checkWebGl();

    let vertexShaderSource = `
        attribute vec2 aPosition; 
        attribute vec4 aColor;
        varying vec4 vColor;
        
        void main(){
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    let fragmentShaderSource = `
        precision mediump float;
        varying vec4 vColor;
        void main(){
            gl_FragColor = vec4(vColor);
        }
    `;

    let vertexShader = utils.getShader(gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = utils.getShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let programs = [];
    programs.push(utils.createProgram(vertexShader,fragmentShader));
    
    let shapes = [];
    let vertice1 = new Vertices([
        0.25, 0.25, 0.0, 0.0, 0.0, 1.0,
        0.50, 0.25, 0.0, 0.0, 0.0, 1.0,
        0.50, 0.50, 0.0, 0.0, 0.0, 1.0,
        0.25, 0.25, 0.0, 0.0, 0.0, 1.0,
        0.50, 0.50, 0.0, 0.0, 0.0, 1.0,
        0.25, 0.50, 0.0, 0.0, 0.0, 1.0,
    ],gl.TRIANGLES);
    let shape = new Shape();
    shape.addVertices(vertice1);
    shapes.push(shape);

    utils.addShape(shapes);

    render();
}

function render(){
    requestAnimationFrame(render);
    utils.draw();
}