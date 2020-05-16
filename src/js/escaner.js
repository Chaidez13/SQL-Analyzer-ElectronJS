function clean() {
  document.getElementById("all-tokens").innerHTML = "";
}

function cleanConsole(){
  clean();
  editor.setValue("")
}

function escanear() {
  clean();
  var text = [];
  editor.doc.children.forEach((e) => {
    text = text.concat(e.lines);
  });
  document.getElementById("consola").innerHTML = "";
  var listaTokens = [],
    listaId = [],
    listaCo = [];
  query_tt = editor.getValue();
  dml_ = false;
  var c = 1,
    error_val = 100,
    cts = 0,
    cs = 0,
    ca = 1,
    cr = 1;

  const regex = />=|<=|(?<=([\"']\b))(?:(?=(\\?))\2.)*?(?=\1)|\w+[#]?|\S/g;
  const del = /[().,'‘’;]/;
  const ope = /[*+-/]/;
  const id = /[@]?[a-zA-Z]\w*[#]?/;
  const con = /\d+[,.]?\d*/;
  const rel = /[<>=]+/;

  for (let i = 0; i < text.length; i++) {
    const line = i + 1;
    var comilla = false;

    const tokens = text[i].text.match(regex);

    if (tokens != null)
      tokens.forEach((e) => {
        var value, type;
        error_val = 100;

        if (rel.test(e)) {
          type = 8;
          switch (e) {
            case ">":
              value = 81;
              break;
            case "<":
              value = 82;
              break;
            case "=":
              value = 83;
              break;
            case ">=":
              value = 84;
              break;
            case "<=":
              value = 85;
              break;
          }
          listaTokens.push({
            valor: type,
            linea: line,
            cadena: e,
          });
        } else if (del.test(e)) {
          type = 5;
          switch (e) {
            case ",":
              value = 50;
              break;
            case ".":
              value = 51;
              break;
            case "(":
              value = 52;
              break;
            case ")":
              value = 53;
              break;
            case ";":
              value = 55;
              break;
            default:
              value = 54;
              comilla = !comilla;
              break;
          }
          if ((cts == 53 || cts == 21) && value == 50) {
            ca++;
            cts = 50;
          }
          if (cts == 531 && (value == 50 || value == 53)) {
            cr++;
            cts = value;
          }
          if (
            (cts == 53 || cts == 531 || cts == 21 || cts == 533) &&
            value == 53
          ) {
            tabla_semantica[tabla_semantica.length - 1].noAtributos = ca;
            tabla_semantica[tabla_semantica.length - 1].noRest = cr;
            cts = 0;
          }
          if (cts == 41 && value == 52) cts = 52;
          if (cts == 18 && value == 52) cts = 520;
          if (cts == 61 && value == 53) cts = 53;
          if (cts == 23 && value == 52) cts = 521;
          if (cts == 44 && value == 53) cts = 531;
          if (cts == 45 && value == 52) cts = 522;
          if (cts == 46 && value == 53) cts = 531;
          if (cts == 531 && value == 50) cts = 50;

          listaTokens.push({
            valor: value,
            linea: line,
            cadena: e,
          });
        } else if (ope.test(e)) {
          type = 7;
          switch (e) {
            case "+":
              value = 70;
              break;
            case "-":
              value = 71;
              break;
            case "*":
              value = 72;
              break;
            case "/":
              value = 73;
              break;
          }
          listaTokens.push({
            valor: value,
            linea: line,
            cadena: e,
          });
        } else if (palabrasReservadas.find((word) => word.palabra === e)) {
          type = 1;
          value = palabrasReservadas.find((word) => word.palabra === e).valor;
          if (value == 16) cts = 16;
          if (value == 17 && cts == 16) cts = 17;
          if (cts == 42 && (value == 18 || value == 19)) {
            cts = 18;
            tabla_atributo[tabla_atributo.length - 1].tipo = e.toUpperCase();
          }
          if (cts == 53 && value == 20) cts = 20;
          if (cts == 20 && value == 21) {
            (tabla_atributo[tabla_atributo.length - 1].nullo = false),
              (cts = 21);
          }
          if (cts == 50 && value == 22) cts = 22;
          if (cts == 43 && (value == 24 || value == 25)) {
            cts = 24;
            tabla_restric[tabla_restric.length - 1].tipo =
              e.toUpperCase() == "PRIMARY" ? 1 : 2;
          }
          if (cts == 24 && value == 23) cts = 23;
          if (cts == 531 && value == 26) cts = 26;
          listaTokens.push({
            valor: value,
            linea: line,
            cadena: e,
          });
        } else if (comilla) {
          type = 6;
          if (!listaCo.find((token) => token === e)) {
            listaCo.push(e);
          }
          value = listaCo.indexOf(e) + 600;
          listaTokens.push({
            valor: 62,
            linea: line,
            cadena: e,
          });
        } else if (id.test(e)) {
          type = 4;
          if (!listaId.find((token) => token === e)) {
            listaId.push(e);
          }
          if (cts == 17) {
            let add = true;
            if (tabla_semantica.find((f) => f.nombre == e)) {
              add = false;
            }
            if (add) {
              cs = tabla_semantica.length + 1;
              ca = 0;
              cr = 0;
              tabla_semantica.push({
                numero: cs,
                nombre: e,
                noAtributos: 0,
                noRest: 0,
              });
              cts = 41;
            } else {
              cts = 0;
            }
          }
          if (cts == 52 || cts == 50) {
            cts = 42;
            tabla_atributo.push({
              idTabla: cs,
              numero: tabla_atributo.length + 1,
              nombre: e,
              tipo: "",
              longitud: "",
              nullo: true,
            });
          }
          if (cts == 22) {
            cts = 43;
            tabla_restric.push({
              idTabla: cs,
              numero: tabla_restric.push.length + 1,
              tipo: 0,
              nombre: e,
              idAtributo: 0,
              tablaFk: null,
              atributoFk: null,
            });
          }
          if (cts == 521) {
            cts = 44;
            let aux;
            for (let j = tabla_atributo.length - 1; j >= 0; j--) {
              if (tabla_atributo[j].nombre == e) {
                aux = tabla_atributo[j].numero;
                j = 0;
              }
            }
            tabla_restric[tabla_restric.length - 1].idAtributo = aux;
          }
          if (cts == 26) {
            cts = 45;
            tabla_semantica.forEach((f) => {
              if (f.nombre == e)
                tabla_restric[tabla_restric.length - 1].tablaFk = f.numero;
            });
          }
          if (cts == 522) {
            cts = 46;
            tabla_atributo.forEach((f) => {
              if (
                f.nombre == e &&
                f.idTabla == tabla_restric[tabla_restric.length - 1].tablaFk
              )
                tabla_restric[tabla_restric.length - 1].atributoFk = f.numero;
            });
          }

          value = listaId.indexOf(e) + 400;
          listaTokens.push({
            valor: type,
            linea: line,
            cadena: e,
          });
        } else if (con.test(e)) {
          type = 6;
          if (!listaCo.find((token) => token === e)) {
            listaCo.push(e);
          }
          if (cts == 520 && !comilla) {
            tabla_atributo[tabla_atributo.length - 1].longitud = e;
            cts = 61;
          }

          value = listaCo.indexOf(e) + 600;
          listaTokens.push({
            valor: 61,
            linea: line,
            cadena: e,
          });
        } else {
          error_val = 101;
        }

        if (error_val == 100) {
          c++;
        } else {
          (error_val = 101),
            consoleOut(101, "Error léxico en línea: " + line + ": " + e);
        }
      });
  }

  if (error_val == 100) {
    consoleOut(100, "Sin error léxico.");
    parser(listaTokens);
  }
}

const palabrasReservadas = [
  {
    palabra: "SELECT",
    valor: 10,
  },
  {
    palabra: "FROM",
    valor: 11,
  },
  {
    palabra: "WHERE",
    valor: 12,
  },
  {
    palabra: "IN",
    valor: 13,
  },
  {
    palabra: "AND",
    valor: 14,
  },
  {
    palabra: "OR",
    valor: 15,
  },
  {
    palabra: "CREATE",
    valor: 16,
  },
  {
    palabra: "TABLE",
    valor: 17,
  },
  {
    palabra: "CHAR",
    valor: 18,
  },
  {
    palabra: "NUMERIC",
    valor: 19,
  },
  {
    palabra: "NOT",
    valor: 20,
  },
  {
    palabra: "NULL",
    valor: 21,
  },
  {
    palabra: "CONSTRAINT",
    valor: 22,
  },
  {
    palabra: "KEY",
    valor: 23,
  },
  {
    palabra: "PRIMARY",
    valor: 24,
  },
  {
    palabra: "FOREIGN",
    valor: 25,
  },
  {
    palabra: "REFERENCES",
    valor: 26,
  },
  {
    palabra: "INSERT",
    valor: 27,
  },
  {
    palabra: "INTO",
    valor: 28,
  },
  {
    palabra: "VALUES",
    valor: 29,
  },
  {
    palabra: "DISTINCT",
    valor: 30,
  },
];
