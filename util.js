"use strict";

function createNode(transform, render, sibling, child) {
    var node = {
        transform: transform,
        render: render,
        sibling: sibling,
        child: child,
    }
    return node;
}

var stack = [];
var modelViewMatrix = mat4();
function traverse(figure, Id) {
    if(Id == null) return;
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    figure[Id].render(modelViewMatrix);
    if(figure[Id].child != null) traverse(figure[Id].child);
    modelViewMatrix = stack.pop();
    if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}

function mult_mat_vec(mat, vec) {
    if (!mat.matrix) 
        throw "mult_mat_vec(): the first argument is not a matrix";
    if (mat[0].length != vec.length)
        throw "mult_mat_vec(): wrong dimensions";

    var ris = Array.apply(null, Array(mat.length)).map(Number.prototype.valueOf,0);

    for ( var i = 0; i < mat.length; ++i ) {
        for ( var j = 0; j < mat[0].length; ++j ) {
            ris[i] += mat[i][j] * vec[j];
        }
    }

    return ris;
}

function apply_matrix3(mat, vec) {
    if (!mat.matrix) 
        throw "apply_matrix3(): the first argument is not a matrix";
    if (mat[0].length < 3 || vec.length < 3)
        throw "mult_mat_vec(): wrong dimensions";

    var ris = Array.apply(null, Array(3)).map(Number.prototype.valueOf,0);

    for ( var i = 0; i < 3; ++i ) {
        for ( var j = 0; j < 3; ++j ) {
            ris[i] += mat[i][j] * vec[j];
        }
    }

    return ris;
}

function apply_matrix4(mat, vec) {
    if (!mat.matrix) 
        throw "apply_matrix3(): the first argument is not a matrix";
    if (mat[0].length < 4 || vec.length < 4)
        throw "mult_mat_vec(): wrong dimensions";

    var ris = Array.apply(null, Array(4)).map(Number.prototype.valueOf,0);

    for ( var i = 0; i < 4; ++i ) {
        for ( var j = 0; j < 4; ++j ) {
            ris[i] += mat[i][j] * vec[j];
        }
    }

    return ris;
}

function dump_matrix(mat) {
    var ris = "";
    for ( var i = 0; i < mat.length; ++i ) {
        for ( var j = 0; j < mat[0].length; ++j ) {
            if (j < mat[0].length - 1)
                ris += mat[i][j].toString() + ", ";
            else ris += mat[i][j].toString();
        }
        ris += "\n";
    }
    return ris;
}