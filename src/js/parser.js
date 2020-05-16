function parser(tokens) {
  var pila = [];
  pila.push(199);
  pila.push(999);
  tokens.push({
    valor: 199,
    linea: tokens[tokens.length - 1].linea,
  });
  var apun = 0,
    x,
    k;
  do {
    x = pila.pop();
    k = tokens[apun].valor;
    //console.log(x + " : " + k);
    if (x >= 700 && x != 999) {
      let salir;
      switch (x) {
        case 700:
          R700(tokens[apun - 1].cadena);
          break;
        case 701:
          if (!R701(tokens[apun - 1].cadena)) salir = true;
          break;
        case 702:
          if (!R702(tokens[apun - 1].cadena)) salir = true;
          break;
        case 703:
          if (!R703(tokens[apun - 1].cadena)) salir = true;
          break;
        case 704:
          where = true;
          break;
        case 705: //Char
          if (where) {
            comparables.push({
              nombre: tokens[apun - 1].cadena,
              tipo: "CHAR",
            });
          }
          break;
        case 706: //Numeric
          if (where) {
            comparables.push({
              nombre: tokens[apun - 1].cadena,
              tipo: "NUMERIC",
            });
          }
          break;
        case 707:
          comparables.pop();
          break;
        case 708:
          atributoAux = atributos;
          tablasAux = tablas;
          if (!validar_integridad()) salir = true;
          break;
        case 709:
          if (!validar_integridad()) {
            salir = true;
          } else {
            atributos = atributoAux;
            tablas = tablasAux;
          }
          break;
        default:
          break;
      }
      if (salir) {
        x = pila.pop;
        break;
      }
    } else if (x < 200 && x != 99) {
      if (x == 10) {
        tablas = [];
        atributos = [];
        comparables = [];
        where = false;
        dml_ = true;
      }
      if (x == k) {
        apun++;
      } else {
        break;
      }
    } else {
      try {
        const prod = tabla_sintactica
          .find((tokens) => tokens.renglon == x)
          .columnas.find((renglon) => renglon.token == k).produccion;
        if (prod != 99) {
          pila = pila.concat(prod);
        }
      } catch (error) {
        break;
      }
    }
  } while (x != 199);

  if (x == 199) {
    consoleOut(200, "Sin error sintáctico.");
    if (validar_integridad()) {
      if (validar_tipos() && dml_) {
        consoleOut(300, "Sin error semántico")
        conexion(query_tt);
      }
    }
  } else {
    var ex = x;
    if (x >= 200) {
      ex = tabla_sintactica.find((tokens) => tokens.renglon == x).primeros[0];
    }
    if (ex >= 10 && ex <= 40)
      consoleOut(
        201,
        "Se esperaba palabra reservada en línea " + tokens[apun].linea
      );
    else if (ex == 4)
      consoleOut(
        204,
        "Se esperaba identificador en línea " + tokens[apun].linea
      );
    else if (ex >= 50 && ex <= 55)
      consoleOut(205, "Se esperaba delimitador en línea " + tokens[apun].linea);
    else if (ex == 61 || ex == 62)
      consoleOut(206, "Se esperaba constanteen línea " + tokens[apun].linea);
    else if (ex == 8)
      consoleOut(
        208,
        "Se esperaba operador relacional en línea " + tokens[apun].linea
      );
    else if (ex >= 70 && ex <= 77)
      consoleOut(207, "Se esperaba operador en línea " + tokens[apun].linea);
  }
  console.log(x == 199 ? "Bien" : "Mal");
}
