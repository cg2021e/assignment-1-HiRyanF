import {glUtils} from './glUtils.js';
import { Vertices } from './Vertices.js';
import { Shape } from './Shape.js';

window.onload = () => {
    main();
    render();
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

    let vertexShaderSource2 = `
        attribute vec2 aPosition; 
        attribute vec4 aColor;
        varying vec4 vColor;
        uniform vec2 uChange;
        
        void main(){
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    let fragmentShaderSource2 = `
        precision mediump float;
        varying vec4 vColor;
        void main(){
            gl_FragColor = vec4(vColor);
        }
    `;

    let vertexShader = utils.getShader(gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = utils.getShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    let vertexShader2 = utils.getShader(gl.VERTEX_SHADER, vertexShaderSource2);
    let fragmentShader2 = utils.getShader(gl.FRAGMENT_SHADER, fragmentShaderSource2);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let programs = [];
    programs.push(utils.createProgram(vertexShader,fragmentShader));
    programs.push(utils.createProgram(vertexShader2,fragmentShader2));
    
    const default_alpha = 0.1;
    let shapes = [];

    let front_vertices = new Vertices([
        -0.9, -0.5, 1.0, 1.0, 1.0, default_alpha, 
        -0.15, -0.5, 1.0, 1.0, 1.0, default_alpha,
        -0.15, -0.33, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.5, 1.0, 1.0, 1.0, default_alpha,
        -0.15, -0.33, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.33, 1.0, 1.0, 1.0, default_alpha
    ], gl.TRIANGLES);

    let startX, startY, topY, col;
    startX = -0.9;
    startY = -0.5;
    topY = -0.33;
    col = 0.9999;

    let rounded_front_left_vertices = [];

    const stepX = 0.000001;
    const stepY = 0.0000005;
    const colStep = -0.00003;

    for (let i = 0; i <=25000; i++) {
        rounded_front_left_vertices.push(
            startX - stepX, startY + stepY, col, col, col, default_alpha,
            startX, startY + stepY, col, col, col, default_alpha,
            startX, topY, col, col, col, default_alpha,
            startX - stepX, startY + stepY, col, col, col, default_alpha,
            startX, topY, col, col, col, default_alpha,
            startX - stepX, topY, col, col, col, default_alpha,
            startX, startY + stepY, col, col, col, default_alpha,
            startX - stepX, startY + stepY, col, col, col, default_alpha,
            startX, startY, col, col, col, default_alpha,
        );
        startX = startX - stepX;
        startY = startY + stepY;
        col = col + colStep;
    }

    rounded_front_left_vertices = new Vertices(rounded_front_left_vertices, gl.TRIANGLES);


    startX = -0.15;
    startY = -0.5;
    topY = -0.33;
    col = 0.9999;
    let rounded_front_right_vertices = []; 
    
    for (let i = 0; i <=25000; i++) {
        rounded_front_right_vertices.push(
            startX, startY + stepY, col, col, col, default_alpha,
            startX + stepX, startY + stepY, col, col, col, default_alpha,
            startX + stepX, topY, col, col, col, default_alpha,
            startX, startY + stepY, col, col, col, default_alpha,
            startX + stepX, topY, col, col, col, default_alpha,
            startX, topY, col, col, col, default_alpha,
            startX, startY + stepY, col, col, col, default_alpha,
            startX + stepX, startY + stepY, col, col, col, default_alpha,
            startX, startY, col, col, col, default_alpha,
        );
        startX = startX + stepX;
        startY = startY + stepY;
        col = col + colStep;
    }
    rounded_front_right_vertices = new Vertices(rounded_front_right_vertices, gl.TRIANGLES);

    var cap_front_vertices = new Vertices([
        -0.9, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        -0.15, -0.33, 1.0, 1.0, 1.0, default_alpha,
        -0.15, -0.25, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        -0.15, -0.25, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.25, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    startX = -0.9;
    startY = -0.33;
    topY = -0.25;
    col = 0.9999;

    const coverStepX = 0.000001;
    const coverStepY = 0.000001;
    const covercolStep = -0.00003;
    let rounded_cap_front_left_vertices = [];
    
    for (let i = 0; i <=25000; i++) {
        rounded_cap_front_left_vertices.push(
            startX - coverStepX, startY, col, col, col, default_alpha,
            startX, startY, col, col, col, default_alpha,
            startX, topY - coverStepY, col, col, col, default_alpha,
            startX - coverStepX, startY, col, col, col, default_alpha,
            startX, topY - coverStepY, col, col, col, default_alpha,
            startX - coverStepX, topY - coverStepY, col, col, col, default_alpha,
            startX, topY - coverStepY, col, col, col, default_alpha,
            startX - coverStepX, topY - coverStepY, col, col, col, default_alpha,
            startX, topY, col, col, col, default_alpha,
        );
        
        startX = startX - coverStepX;
        topY = topY - coverStepY;
        col = col + covercolStep;
        
    }
    rounded_cap_front_left_vertices = new Vertices(rounded_cap_front_left_vertices, gl.TRIANGLES);


    startX = -0.15;
    startY = -0.33;
    topY = -0.25;
    col = 0.9999;

    let rounded_cap_front_right_vertices = [];
    
    for (let i = 0; i <=25000; i++) {
        rounded_cap_front_right_vertices.push(
            startX, startY, col, col, col, default_alpha,
            startX + coverStepX, startY, col, col, col, default_alpha,
            startX + coverStepX, topY - coverStepY, col, col, col, default_alpha,
            startX, startY, col, col, col, default_alpha, 
            startX + coverStepX, topY - coverStepY, col, col, col, default_alpha,
            startX, topY - coverStepY, col, col, col, default_alpha,
            startX, topY - coverStepY, col, col, col, default_alpha,
            startX + coverStepX, topY - coverStepY, col, col, col, default_alpha,
            startX, topY, col, col, col, default_alpha,
        );
        
        startX = startX + coverStepX;
        topY = topY - coverStepY;
        col = col + covercolStep;
        
    }
    rounded_cap_front_right_vertices = new Vertices(rounded_cap_front_right_vertices, gl.TRIANGLES);

    col = 0.89
    let rounded_cap_top_vertices = new Vertices([        
        -0.9, -0.25, col, col, col, default_alpha,
        -0.85, -0.25, col, col, col, default_alpha,
        -0.85, -0.20, col, col, col, default_alpha,
        -0.85, -0.25, col, col, col, default_alpha,
        -0.85, -0.20, col, col, col, default_alpha,
        -0.2, -0.20, col, col, col, default_alpha,
        -0.85, -0.25, col, col, col, default_alpha,
        -0.2, -0.20, col, col, col, default_alpha,
        -0.2, -0.25, col, col, col, default_alpha,
        -0.2, -0.20, col, col, col, default_alpha,
        -0.2, -0.25, col, col, col, default_alpha,
        -0.15, -0.25, col, col, col, default_alpha
    ], gl.TRIANGLES);

    let line_vertices = new Vertices([
        -0.925, -0.34, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.34, 0.0, 0.0, 0.0, 0.5,
        -0.925, -0.33, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.33, 0.0, 0.0, 0.0, 0.5,
        -0.925, -0.32, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.32, 0.0, 0.0, 0.0, 0.5,
    ], gl.LINES);


    let shape = new Shape();
    shape.addVertices(front_vertices);
    shape.addVertices(rounded_front_left_vertices);
    shape.addVertices(rounded_front_right_vertices);
    shape.addVertices(cap_front_vertices);
    shape.addVertices(rounded_cap_front_left_vertices);
    shape.addVertices(rounded_cap_front_right_vertices);
    shape.addVertices(rounded_cap_top_vertices);
    shape.addVertices(line_vertices);
    shapes.push(shape);

    let left_vertices = new Vertices([
        0.3125, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.33, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.33, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);


    shape = new Shape();
    shape.addVertices(left_vertices);
    shape.setCenter(0.5,-0.415);
    shape.setSize(0.375, 0.25);
    shapes.push(shape);

    utils.addShape(shapes);

    render();
}

function render(){
    requestAnimationFrame(render);
    utils.draw();
}
