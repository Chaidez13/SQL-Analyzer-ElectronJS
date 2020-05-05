
function parser(tokens){
    var pila = [];
    pila.push(199)
    pila.push(999)
    tokens.push({
        valor: 199,
        linea: 0,
    })
    var apun = 0, x, k;
    do{
        x = pila.pop();
        k = tokens[apun].valor;
        if(x < 200){
            if(x == k){
                apun ++;
            }else{
                break;
            }
        }else {
            try {
                const prod = tabla_sintactica.find(tokens => tokens.renglon == x).columnas.find(renglon => renglon.token == k).produccion 
                if(prod != 99){
                    pila = pila.concat(prod)
                }
            } catch (error) {
                break;
            }
        }
    }while(x!=199)

    if(x==199){
        consoleOut(200, 'Sin error sintáctico.')
    } else {
        var ex = x;
        if(x >= 200){
            ex = tabla_sintactica.find(tokens => tokens.renglon == x).primeros[0]
        }
        if (ex >= 10 && ex <=40)
            consoleOut(201, 'Se esperaba palabra reservada en línea ' + tokens[apun].linea)
        else if (ex == 4)
            consoleOut(204, 'Se esperaba identificador en línea ' + tokens[apun].linea)
        else if (ex >= 50 && ex <=55)
            consoleOut(205, 'Se esperaba delimitador en línea ' + tokens[apun].linea)
        else if (ex == 61 || ex == 62)
            consoleOut(206, 'Se esperaba constanteen línea ' + tokens[apun].linea)
        else if (ex == 8)
            consoleOut(208, 'Se esperaba operador relacional en línea ' + tokens[apun].linea)
        else if (ex >= 70 && ex <=77)
            consoleOut(207, 'Se esperaba operador en línea ' + tokens[apun].linea)
    }
    console.log((x==199)?'Paso':'No paso')
}