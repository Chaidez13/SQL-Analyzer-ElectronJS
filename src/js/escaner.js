
function clean(){
    document.getElementById("all-tokens").innerHTML = "<tr><th>Número</th><th>Linea</th><th>Token</th><th>Tipo</th><th>Código</th></tr>";
}

function escanear(){
    clean()
    const text = document.querySelector('#sentencia-sql').value;
    console.log(text)
    var listaTokens = [], listaId = [], listaCo = [];
    var c = 1, error = 100;

    const lineSeparator = /\n/g;
    const regex = />=|<=|(?<=').*(?=')|\w+[#]?|\S/g;
    const del = /[().,'‘’;]/
    const ope = /[*+-/]/
    const id = /[@]?[a-zA-Z]\w*[#]?/
    const con = /\d+[,.]?\d*/
    const rel = /[<>=]+/

    var texto = text.split(lineSeparator)
    console.log(texto)

    for (let i = 0; i < texto.length; i++) {
        const line = (i+1);
        const lineaTexto = texto[i];
        console.log(lineaTexto)

        const tokens = lineaTexto.match(regex);
        console.log(tokens)

        tokens.forEach(e => {
            var value, type;

            if(rel.test(e)){
                type = 8;
                value = 83;
                listaTokens.push({
                    valor: type,
                    linea: i,
                })
            } else if(del.test(e)){
                type = 5;
                value = 51;
                listaTokens.push({
                    valor: type,
                    linea: i,
                })
            } else if(ope.test(e)){
                type = 7;
                value = 72;
                listaTokens.push({
                    valor: type,
                    linea: i,
                })
            } else if(palabrasReservadas.find(word => word.palabra === e) ){
                type = 1;
                value = palabrasReservadas.find(word => word.palabra === e).valor;
                listaTokens.push({
                    valor: value,
                    linea: i,
                })
            } else if(id.test(e)){
                type = 4;
                if(!listaId.find(token => token === e)){
                    listaId.push(e)
                }
                value = listaId.indexOf(e) + 400;
                listaTokens.push({
                    valor: type,
                    linea: i,
                })
            } else if(con.test(e)) {
                type = 61;
                if(!listaCo.find(token => token === e)){
                    listaCo.push(e)
                }
                value = listaCo.indexOf(e) + 600;
                listaTokens.push({
                    valor: type,
                    linea: i,
                })
            }

            if(error==100){
                var newElement = document.createElement("TR");
                var fila="<tr><td>"+c+"</td><td>"+line+"</td><td>"+e+"</td><td>"+type+"</td><td>"+value+"</td></tr>";
                newElement.innerHTML=fila;
                document.getElementById("all-tokens").appendChild(newElement);
                c++;
            }
        });
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


