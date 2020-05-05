
function getHora(){
    var date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
}

function consoleOut(code, message){
    var consola = document.getElementById("consola");
    var output = document.createElement("p");
    const exit = "["+getHora()+"]: <span class='code'>"+code+": </span>" + message;
    output.innerHTML = exit;
    consola.appendChild(output);
}

const tabla_sintactica = [
    {
        renglon: 999,
        columnas : [
            {
                token: 10,
                produccion : [300], 
            },
            {
                token: 16,
                produccion : [200], 
            },
            {
                token: 27,
                produccion : [211], 
            },
        ],
        primeros: [16],
    },
    {
        renglon: 200,
        columnas : [
            {
                token: 16,
                produccion : [201,55,53,202,52,4,17,16], 
            },
        ],
        primeros: [16],
    },
    {
        renglon: 201,
        columnas : [
            {
                token: 16,
                produccion : [200], 
            },
            {
                token: 27,
                produccion : [211], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [16,27,99],
        siguientes: [199],
    },
    {
        renglon: 202,
        columnas : [
            {
                token: 4,
                produccion : [205,204,53,61,52,203,4], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 203,
        columnas : [
            {
                token: 18,
                produccion : [18], 
            },
            {
                token: 19,
                produccion : [19], 
            },
        ],
        primeros: [18,19],
    },
    {
        renglon: 204,
        columnas : [
            {
                token: 20,
                produccion : [21,20], 
            },
            {
                token: 50,
                produccion : [99], 
            },
        ],
        primeros: [20,99],
        siguientes: [50]
    },
    {
        renglon: 205,
        columnas : [
            {
                token: 50,
                produccion : [206,50], 
            },
            {
                token: 53,
                produccion : [99], 
            },
        ],
        primeros: [50,99],
        siguientes: [53],
    },
    {
        renglon: 206,
        columnas : [
            {
                token: 4,
                produccion : [202], 
            },
            {
                token: 22,
                produccion : [207], 
            },
        ],
        primeros: [4,22],
    },
    {
        renglon: 207,
        columnas : [
            {
                token: 22,
                produccion : [209,53,4,52,208,4,22], 
            },
        ],
        primeros: [22],
    },
    {
        renglon: 208,
        columnas : [
            {
                token: 24,
                produccion : [23,24], 
            },
            {
                token: 25,
                produccion : [23,25], 
            },
        ],
        primeros: [24,25],
    },
    {
        renglon: 209,
        columnas : [
            {
                token: 26,
                produccion : [210,53,4,52,4,26], 
            },
            {
                token: 50,
                produccion : [207,50], 
            },
            {
                token: 53,
                produccion : [99], 
            },
        ],
        primeros: [50,26,99],
        siguientes: [53],
    },
    {
        renglon: 210,
        columnas : [
            {
                token: 50,
                produccion : [207,50], 
            },
            {
                token: 53,
                produccion : [99], 
            },
        ],
        primeros: [50,99],
        siguientes: [53],
    },
    {
        renglon: 211,
        columnas : [
            {
                token: 27,
                produccion : [215,55,53,212,52,29,4,28,27], 
            },
        ],
        primeros: [27],
    },
    {
        renglon: 212,
        columnas : [
            {
                token: 54,
                produccion : [214,213], 
            },
            {
                token: 61,
                produccion : [214,213], 
            },
        ],
        primeros: [54,61],
    },
    {
        renglon: 213,
        columnas : [
            {
                token: 54,
                produccion : [54,62,54], 
            },
            {
                token: 61,
                produccion : [61], 
            },
        ],
        primeros: [54,61],
    },
    {
        renglon: 214,
        columnas : [
            {
                token: 50,
                produccion : [212,50], 
            },
            {
                token: 53,
                produccion : [99], 
            },
        ],
        primeros: [50,99],
        siguientes:[53],
    },
    {
        renglon: 215,
        columnas : [
            {
                token: 16,
                produccion : [200], 
            },
            {
                token: 27,
                produccion : [211], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [27,16,99],
        siguientes:[199],
    },
    {
        renglon: 300,
        columnas : [
            {
                token: 10,
                produccion : [310,306,11,301,10], 
            },
        ],
        primeros: [10],
    },
    {
        renglon: 301,
        columnas : [
            {
                token: 4,
                produccion : [302], 
            },
            {
                token: 72,
                produccion : [72]
            }
        ],
        primeros: [4, 72],
    },
    {
        renglon: 302,
        columnas : [
            {
                token: 4,
                produccion : [303,304], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 303,
        columnas : [
            {
                token: 11,
                produccion : [99], 
            },
            {
                token: 50,
                produccion : [302, 50],
            },
            {
                token: 199,
                produccion : [99],
            }
        ],
        primeros: [50, 99],
        siguientes: [11],
    },
    {
        renglon: 304,
        columnas : [
            {
                token: 4,
                produccion : [305, 4], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 305,
        columnas : [
            {
                token: 8,
                produccion : [99], 
            },
            {
                token: 11,
                produccion : [99],
            },
            {
                token: 13,
                produccion : [99],
            },
            {
                token: 14,
                produccion : [99],
            },
            {
                token: 15,
                produccion : [99],
            },
            {
                token: 50,
                produccion : [99],
            }
            ,
            {
                token: 51,
                produccion : [4, 51],
            },
            {
                token: 53,
                produccion : [99],
            },
            {
                token: 199,
                produccion : [99],
            }
        ],
        primeros: [51, 99],
        siguientes: [11, 13, 14, 15, 50, 53, 8]
    },
    {
        renglon: 306,
        columnas : [
            {
                token: 4,
                produccion : [307, 308], 
            },
        ],
        primeros: [4],
        
    },
    {
        renglon: 307,
        columnas : [
            {
                token: 12,
                produccion : [99], 
            },
            {
                token: 50,
                produccion : [306, 50], 
            },
            {
                token: 53,
                produccion : [99], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [50, 99],
        siguientes: [12, 53, 199]
    },
    {
        renglon: 308,
        columnas : [
            {
                token: 4,
                produccion : [309, 4], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 309,
        columnas : [
            {
                token: 4,
                produccion : [4], 
            },
            {
                token: 12,
                produccion : [99], 
            },
            {
                token: 50,
                produccion : [99], 
            },
            {
                token: 53,
                produccion : [99], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [4, 99],
        siguientes: [12, 50, 53, 199]
    },
    {
        renglon: 310,
        columnas : [
            {
                token: 12,
                produccion : [311, 12], 
            },
            {
                token: 53,
                produccion : [99], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [12, 99],
        siguientes: [53, 199],
    },
    {
        renglon: 311,
        columnas : [
            {
                token: 4,
                produccion : [312, 313], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 312,
        columnas : [
            {
                token: 14,
                produccion : [311, 317], 
            },
            {
                token: 15,
                produccion : [311, 317], 
            },
            {
                token: 53,
                produccion : [99], 
            },
            {
                token: 199,
                produccion : [99], 
            },
        ],
        primeros: [14, 15, 99],
        siguientes: [53, 199]
    },
    {
        renglon: 313,
        columnas : [
            {
                token: 4,
                produccion : [314, 304], 
            },
        ],
        primeros: [4],
    },
    {
        renglon: 314,
        columnas : [
            {
                token: 8,
                produccion : [316, 315], 
            },
            {
                token: 13,
                produccion : [53, 300, 52, 13], 
            },
        ],
        primeros: [90, 13],
    },
    {
        renglon: 315,
        columnas : [
            {
                token: 8,
                produccion : [8], 
            },
        ],
        primeros: [8],
    },
    {
        renglon: 316,
        columnas : [
            {
                token: 4,
                produccion : [304], 
            },
            {
                token: 54,
                produccion : [54, 318, 54], 
            },
            {
                token: 61,
                produccion : [319], 
            },
        ],
        primeros: [4, 54, 61],
    },
    {
        renglon: 317,
        columnas : [
            {
                token: 14,
                produccion : [14], 
            },
            {
                token: 15,
                produccion : [15], 
            },
        ],
        primeros: [14, 15],
    },
    {
        renglon: 318,
        columnas : [
            {
                token: 62,
                produccion : [62], 
            },
        ],
        primeros: [62],
    },
    {
        renglon: 319,
        columnas : [
            {
                token: 61,
                produccion : [61], 
            },
        ],
        primeros: [61],
    },
]