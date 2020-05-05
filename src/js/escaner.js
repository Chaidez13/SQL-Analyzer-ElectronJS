
function clean(){
    document.getElementById("all-tokens").innerHTML = "<tr><th>Número</th><th>Linea</th><th>Token</th><th>Tipo</th><th>Código</th></tr>";
}

function escanear(){
    clean()
    const text = editor.doc.children[0].lines;
    document.getElementById("consola").innerHTML = "";
    var listaTokens = [], listaId = [], listaCo = [];
    var c = 1, error_val = 100;
    
    const regex = />=|<=|(?<=([\"']\b))(?:(?=(\\?))\2.)*?(?=\1)|\w+[#]?|\S/g;
    const del = /[().,'‘’;]/
    const ope = /[*+-/]/
    const id = /[@]?[a-zA-Z]\w*[#]?/
    const con = /\d+[,.]?\d*/
    const rel = /[<>=]+/

    for (let i = 0; i < text.length; i++) {
        const line = (i+1);
        var comilla = false;

        const tokens = text[i].text.match(regex);

        if(tokens != null)
        tokens.forEach(e => {
            var value, type
            error_val = 100

            if(rel.test(e)){
                type = 8;
                switch (e) {
                    case ">": 
                        value=81;
                    break;
                    case "<": 
                        value=82; 
                    break;
                    case "=": 
                        value=83; 
                    break;
                    case ">=": 
                        value=84; 
                    break;
                    case "<=": 
                        value=85; 
                    break;
					}
                listaTokens.push({
                    valor: type,
                    linea: line,
                })
            } else if(del.test(e)){
                type = 5;
                switch(e){
                    case ",": 
                        value=50;
                    break;
                    case ".": 
                        value=51; 
                    break;
                    case "(": 
                        value=52; 
                    break;
                    case ")": 
                        value=53; 
                    break;
                    case ";": 
                        value=55; 
                    break;
					default: 
                        value = 54;
						comilla = !comilla;
					break;
                }
                listaTokens.push({
                    valor: value,
                    linea: line,
                })
            } else if(ope.test(e)){
                type = 7;
                switch (e) {
					case "+":
                        value=70;
                    break;
                    case "-": 
                        value=71; 
                    break;
                    case "*": 
                        value=72; 
                    break;
                    case "/": 
                        value=73;
                    break;
					}
                listaTokens.push({
                    valor: type,
                    linea: line,
                })
            } else if(palabrasReservadas.find(word => word.palabra === e) ){
                type = 1;
                value = palabrasReservadas.find(word => word.palabra === e).valor;
                listaTokens.push({
                    valor: value,
                    linea: line,
                })
            } else if(comilla){
                type = 6;
                if(!listaCo.find(token => token === e)){
                    listaCo.push(e)
                }
                value = listaCo.indexOf(e) + 600;
                listaTokens.push({
                    valor: 62,
                    linea: line,
                })
            } else if(id.test(e)){
                type = 4;
                if(!listaId.find(token => token === e)){
                    listaId.push(e)
                }
                value = listaId.indexOf(e) + 400;
                listaTokens.push({
                    valor: type,
                    linea: line,
                })
            } else if(con.test(e)) {
                type = 6;
                if(!listaCo.find(token => token === e)){
                    listaCo.push(e)
                }
                value = listaCo.indexOf(e) + 600;
                listaTokens.push({
                    valor: 61,
                    linea: line,
                })
            } else {
                error_val = 101;
            }

            if(error_val==100){
                var newElement = document.createElement("TR");
                var fila="<tr><td>"+c+"</td><td>"+line+"</td><td>"+e+"</td><td>"+type+"</td><td>"+value+"</td></tr>";
                newElement.innerHTML=fila;
                document.getElementById("all-tokens").appendChild(newElement);
                c++;
            }else{
                error_val = 101,
                consoleOut(101, "Error léxico en línea: " + line + ": " + e)
            }
        });
    }
    
    if(error_val == 100){
        parser(listaTokens);
        consoleOut(100, "Sin error léxico.")
    }
}

const palabrasReservadas = [
    {
        palabra: 'SELECT',
        valor: 10,
    },
    {
        palabra: 'FROM',
        valor: 11,
    },
    {
        palabra: 'WHERE',
        valor: 12,
    },
    {
        palabra: 'IN',
        valor: 13,
    },
    {
        palabra: 'AND',
        valor: 14,
    },
    {
        palabra: 'OR',
        valor: 15,
    },
    {
        palabra: 'CREATE',
        valor: 16,
    },
    {
        palabra: 'TABLE',
        valor: 17,
    },
    {
        palabra: 'CHAR',
        valor: 18,
    },
    {
        palabra: 'NUMERIC',
        valor: 19,
    },
    {
        palabra: 'NOT',
        valor: 20,
    },
    {
        palabra: 'NULL',
        valor: 21,
    },
    {
        palabra: 'CONSTRAINT',
        valor: 22,
    },
    {
        palabra: 'KEY',
        valor: 23,
    },
    {
        palabra: 'PRIMARY',
        valor: 24,
    },
    {
        palabra: 'FOREIGN',
        valor: 25,
    },
    {
        palabra: 'REFERENCES',
        valor: 26,
    },
    {
        palabra: 'INSERT',
        valor: 27,
    },
    {
        palabra: 'INTO',
        valor: 28,
    },
    {
        palabra: 'VALUES',
        valor: 29,
    }
]


