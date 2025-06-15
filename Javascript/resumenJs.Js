/*Tipos de Variables */
let a = "hola"  //Con let puedo cambiar el valor de la variable y el tipo
const b = "hola" //Con const no puedo reasignarle otro valor, pero en objetos puedo modificar sus atributos
var c // No se usa

/*Tipos de datos */
let d // ahora d tiene tipo de dato undefinded

/* Array */
let array = [1, true, 'story']; //Los arreglos tienen métodos para buscar ordenar,etc

/*Condicionales*/ //Operadores :&&, ||, ===,!==
if (condición) {
  // Código si la condición es verdadera
} else if (otraCondición) {
  // Código si la primera no se cumplió, pero esta sí
} else {
  // Código si ninguna condición se cumplió
}

/*Case o alternativos */
switch (expression){
  case value1:
    //block 1
    break;
  case value2:
    //block 1
    break;
  default:
    //default block
    break;
}

/* Loops e iteraciones */

while (condition){
  // statements
}

do {
  // statements
} while (condition)

for (let i = 0; i < someArray.length; i++){
  //statements
}
