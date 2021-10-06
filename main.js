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
        uniform vec2 uChange;
        
        void main(){
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
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

    let program = utils.createProgram(vertexShader,fragmentShader);
    gl.useProgram(program);

    const default_alpha = 0.08;
    let shapes = []; // Left side shape is a Shape's object and Right side shape is a different Shape's object
    // Each shape may have more than one Vertices object (which have points data and its own gl primitive)

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

    //rounded front left (bottom left)
    let front_left_quarter_circle_vertices = [];
    
    const totalPoints=150;

    let x, y, angle, radius = 0.025;
    startX = -0.90;
    startY = -0.5 + radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        front_left_quarter_circle_vertices.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    front_left_quarter_circle_vertices = new Vertices(front_left_quarter_circle_vertices,gl.TRIANGLE_FAN);

    let rounded_bottom_left_vertices = new Vertices([
        startX, startY - radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33,  1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33,  1.0, 1.0, 1.0, default_alpha,
        startX - radius, -0.33,  1.0, 1.0, 1.0, default_alpha,
        
    ], gl.TRIANGLES);

    //rounded front right (bottom right)
    let front_right_quarter_circle_vertices = [];
    
    radius = 0.025;
    startX = -0.15;
    startY = -0.5 + radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + 1.5 * Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        front_right_quarter_circle_vertices.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    front_right_quarter_circle_vertices = new Vertices(front_right_quarter_circle_vertices,gl.TRIANGLE_FAN);

    let rounded_bottom_right_vertices = new Vertices([
        startX, startY - radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    let cap_front_vertices = new Vertices([
        -0.9, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        -0.15, -0.33, 1.0, 1.0, 1.0, default_alpha,
        -0.15, -0.25, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        -0.15, -0.25, 1.0, 1.0, 1.0, default_alpha,
        -0.9, -0.25, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);


    //rounded front left cap
    let cap_left_quarter_circle_vertices = [];
    
    radius = 0.025;
    startX = -0.90;
    startY = -0.25 - radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + 0.5 * Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        cap_left_quarter_circle_vertices.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    cap_left_quarter_circle_vertices = new Vertices(cap_left_quarter_circle_vertices,gl.TRIANGLE_FAN);

    let rounded_cap_front_left_vertices = new Vertices([
        startX, startY + radius, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, -0.33, 1.0, 1.0, 1.0, default_alpha
    ], gl.TRIANGLES);


    //rounded front right cap
    let cap_right_quarter_circle_vertices = [];

    radius = 0.025;
    startX = -0.15;
    startY = -0.25 - radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        cap_right_quarter_circle_vertices.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    cap_right_quarter_circle_vertices = new Vertices(cap_right_quarter_circle_vertices,gl.TRIANGLE_FAN);

    let rounded_cap_front_right_vertices = new Vertices([
        startX, startY + radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    col = 0.5
    let cap_top_vertices = new Vertices([        
        -0.9125, -0.25, col, col, col, default_alpha,
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
        -0.1375, -0.25, col, col, col, default_alpha
    ], gl.TRIANGLES);


    let line_vertices = new Vertices([
        -0.925, -0.34, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.34, 0.0, 0.0, 0.0, 0.5,
        -0.925, -0.33, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.33, 0.0, 0.0, 0.0, 0.5,
        -0.925, -0.32, 0.0, 0.0, 0.0, 0.5, 
        -0.125, -0.32, 0.0, 0.0, 0.0, 0.5,
    ], gl.LINES);

    let sticker_vertices = [];
    startX = -0.85 + (-0.2 - (-0.85) - radius)/2;
    startY = -0.25 + (-0.2 - (-0.25) - radius)/2 + 0.01;

    // define oval points for jar sticker
    for (let i = 0; i <= totalPoints; i++) {
        angle = 2 * Math.PI * i / totalPoints;
        x = startX + (radius + 0.1) * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        sticker_vertices.push(x, y, 0.85, 0.42, 0.33, 1.0);
    }

    sticker_vertices = new Vertices(sticker_vertices,gl.TRIANGLE_FAN);


    let shape = new Shape(); //left side shape
    shape.addVertices(front_vertices);
    shape.addVertices(front_left_quarter_circle_vertices);
    shape.addVertices(rounded_bottom_left_vertices);
    shape.addVertices(front_right_quarter_circle_vertices);
    shape.addVertices(rounded_bottom_right_vertices);
    shape.addVertices(cap_front_vertices);
    shape.addVertices(cap_left_quarter_circle_vertices);
    shape.addVertices(rounded_cap_front_left_vertices);
    shape.addVertices(cap_right_quarter_circle_vertices);
    shape.addVertices(rounded_cap_front_right_vertices);
    shape.addVertices(cap_top_vertices);
    shape.addVertices(line_vertices);
    shape.addVertices(sticker_vertices);
    shapes.push(shape);

    let front_vertices2 = new Vertices([
        0.3125, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.33, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.5, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.33, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    //rounded front left (bottom left)
    let front_left_quarter_circle_vertices2 = [];
    radius = 0.025;
    startX = 0.3125;
    startY = -0.5 + radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        front_left_quarter_circle_vertices2.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    front_left_quarter_circle_vertices2 = new Vertices(front_left_quarter_circle_vertices2,gl.TRIANGLE_FAN);

    let rounded_bottom_left_vertices2 = new Vertices([
        startX, startY - radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33,  1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33,  1.0, 1.0, 1.0, default_alpha,
        startX - radius, -0.33,  1.0, 1.0, 1.0, default_alpha,
        
    ], gl.TRIANGLES);

    //rounded front right (bottom right)
    let front_right_quarter_circle_vertices2 = [];
    
    radius = 0.025;
    startX = 0.6875;
    startY = -0.5 + radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + 1.5 * Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        front_right_quarter_circle_vertices2.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    front_right_quarter_circle_vertices2 = new Vertices(front_right_quarter_circle_vertices2,gl.TRIANGLE_FAN);

    let rounded_bottom_right_vertices2 = new Vertices([
        startX, startY - radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    

    let cap_front_vertices2 = new Vertices([
        0.3125, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        0.6875, -0.33, 1.0, 1.0, 1.0, default_alpha,
        0.6875, -0.25, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.33, 1.0, 1.0, 1.0, default_alpha, 
        0.6875, -0.25, 1.0, 1.0, 1.0, default_alpha,
        0.3125, -0.25, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);


    //rounded front left cap
    let cap_left_quarter_circle_vertices2 = [];
    
    radius = 0.025;
    startX = 0.3125;
    startY = -0.25 - radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints + 0.5 * Math.PI;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        cap_left_quarter_circle_vertices2.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    cap_left_quarter_circle_vertices2 = new Vertices(cap_left_quarter_circle_vertices2,gl.TRIANGLE_FAN);

    let rounded_cap_front_left_vertices2 = new Vertices([
        startX, startY + radius, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX - radius, -0.33, 1.0, 1.0, 1.0, default_alpha
    ], gl.TRIANGLES);


    //rounded front right cap
    let cap_right_quarter_circle_vertices2 = [];

    radius = 0.025;
    startX = 0.6875;
    startY = -0.25 - radius;

    for (let i = 0; i <= totalPoints; i++) {
        angle = 0.5 * Math.PI * i / totalPoints;
        x = startX + radius * Math.cos(angle);
        y = startY + radius * Math.sin(angle);
        cap_right_quarter_circle_vertices2.push(x, y, 1.0, 1.0, 1.0, default_alpha);
    }
    cap_right_quarter_circle_vertices2 = new Vertices(cap_right_quarter_circle_vertices2,gl.TRIANGLE_FAN);

    let rounded_cap_front_right_vertices2 = new Vertices([
        startX, startY + radius, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, startY, 1.0, 1.0, 1.0, default_alpha,
        startX + radius, -0.33, 1.0, 1.0, 1.0, default_alpha,
        startX, -0.33, 1.0, 1.0, 1.0, default_alpha,
    ], gl.TRIANGLES);

    col = 0.5
    let cap_top_vertices2 = new Vertices([        
        0.3, -0.25, col, col, col, default_alpha,
        0.3725, -0.25, col, col, col, default_alpha,
        0.3725, -0.18, col, col, col, default_alpha,
        0.3725, -0.25, col, col, col, default_alpha,
        0.3725, -0.18, col, col, col, default_alpha,
        0.6275, -0.18, col, col, col, default_alpha,
        0.3725, -0.25, col, col, col, default_alpha,
        0.6275, -0.18, col, col, col, default_alpha,
        0.6275, -0.25, col, col, col, default_alpha,
        0.6275, -0.18, col, col, col, default_alpha,
        0.6275, -0.25, col, col, col, default_alpha,
        0.7, -0.25, col, col, col, default_alpha
    ], gl.TRIANGLES);

    let line_vertices2 = new Vertices([
        0.2875, -0.34, 0.0, 0.0, 0.0, 0.5, 
        0.7125, -0.34, 0.0, 0.0, 0.0, 0.5,
        0.2875, -0.33, 0.0, 0.0, 0.0, 0.5, 
        0.7125, -0.33, 0.0, 0.0, 0.0, 0.5,
        0.2875, -0.32, 0.0, 0.0, 0.0, 0.5, 
        0.7125, -0.32, 0.0, 0.0, 0.0, 0.5,
    ], gl.LINES);

    let sticker_vertices2 = [];
    radius = 0.02
    startX = 0.3725 + (0.6275 - 0.3725 - radius)/2;
    startY = -0.25 + (-0.18 - (-0.25) - radius)/2 + 0.015;

    // define oval points for jar sticker
    for (let i = 0; i <= totalPoints; i++) {
        angle = 2 * Math.PI * i / totalPoints;
        x = startX + (radius + 0.05) * Math.cos(angle);
        y = startY + (radius + 0.008) * Math.sin(angle);
        sticker_vertices2.push(x, y, 0.85, 0.42, 0.33, 1.0);
    }

    sticker_vertices2 = new Vertices(sticker_vertices2,gl.TRIANGLE_FAN);

    shape = new Shape(); //right side shape
    shape.addVertices(front_vertices2);
    shape.addVertices(front_left_quarter_circle_vertices2);
    shape.addVertices(rounded_bottom_left_vertices2);
    shape.addVertices(front_right_quarter_circle_vertices2);
    shape.addVertices(rounded_bottom_right_vertices2);
    shape.addVertices(cap_front_vertices2);
    shape.addVertices(cap_left_quarter_circle_vertices2);
    shape.addVertices(rounded_cap_front_left_vertices2);
    shape.addVertices(cap_right_quarter_circle_vertices2);
    shape.addVertices(rounded_cap_front_right_vertices2);
    shape.addVertices(cap_top_vertices2);
    shape.addVertices(line_vertices2);
    shape.addVertices(sticker_vertices2);
    shape.setCenter(0.5,-0.34);
    shape.setSize(0.375, 0.32);
    shapes.push(shape);

    utils.addShape(shapes);

    render();
}

function render(){
    requestAnimationFrame(render);
    utils.draw();
}
