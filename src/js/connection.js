function conexion(query_) {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "inscritos",
  });

  connection.connect((err) => {
    if (err) {
      consoleOut(402, err.stack);
      return console.log(err.stack);
    }
    console.log("Conexión establecida.");
  });

  var columnas = [];
  connection.query(query_, (err, rows, fields) => {
    if (err) {
      consoleOut(401, err);
      return console.log("Consulta invalida ", err);
    }

    var newElement = document.createElement("TR");
    var fila = "<tr>";
    fields.forEach((e) => {
      columnas.push(e.name);
      fila += `<th>${e.name}</th>`;
    });
    fila += "</tr>";
    newElement.innerHTML = fila;
    document.getElementById("all-tokens").appendChild(newElement);

    rows.forEach((e) => {
      var newChild = document.createElement("TR");
      var fila_ = "<tr>";
      columnas.forEach((data) => {
        fila_ += `<td>${e[data]}</td>`;
      });
      fila_ += "</tr>";
      newChild.innerHTML = fila_;
      document.getElementById("all-tokens").appendChild(newChild);
    });
  });

  connection.end(() => {
    console.log("Conexión finalizada.");
  });
}

var first = false;
function traerAtributos() {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "inscritos",
  });

  connection.connect((err) => {
    if (err) {
      consoleOut(402, err.stack);
      return console.log(err.stack);
    }
    console.log("Conexión establecida.");
  });

  queryString =
    "SELECT TABLE_NAME as tabla, COLUMN_NAME as atributo, ORDINAL_POSITION as noAtributo, IS_NULLABLE as nll, DATA_TYPE as tipo, CHARACTER_MAXIMUM_LENGTH as longChar, NUMERIC_PRECISION as longNum FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'inscritos' ORDER BY tabla";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      consoleOut(401, err);
      return console.log("Consulta invalida ", err);
    }
    let con_ = 0,
      name_ = rows[0].tabla;
    rows.forEach((e) => {
      if (!tabla_semantica.find((g) => g.nombre == e.tabla)) {
        if (e.tabla != name_) {
          tabla_semantica.push({
            numero: tabla_semantica.length + 1,
            nombre: name_.toUpperCase(),
            noAtributos: con_,
            noRest: 0,
          });
          name_ = e.tabla;
          con_ = 0;
        }
        tabla_atributo.push({
          idTabla: tabla_semantica.length + 1,
          numero: tabla_atributo.length + 1,
          nombre: e.atributo,
          tipo: e.tipo == "char" ? "CHAR" : "NUMERIC",
          longitud: e.tipo == "char" ? e.longChar : e.longNum,
          nullo: e.nll == "NO" ? false : true,
        });
        con_++;
      }
    });
    if (!first) {
      first = true;
      tabla_semantica.push({
        numero: tabla_semantica.length + 1,
        nombre: rows[rows.length - 1].tabla.toUpperCase(),
        noAtributos: con_,
        noRest: 0,
      });
    }
    consoleOut(400, 'Datos traidos de la base de datos con exito')
  });

  connection.end(() => {
    console.log("Conexión finalizada.");
  });
}
