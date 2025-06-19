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

/* forEach method */
const datos =[true, "Baldo", 2345];

function show(element) {
  console.log(element)
}
datos.forEach(show);

datos.forEach(element => console.log(element));

datos.forEach(function(element) {console.log(element)})

/* Funciones (son "objetos", pero pueden ser llamadas) */
//Funcion clásica
function saludar(nombre,apellido){
  return `${nombre} ${apellido}`;
}
/* Funciones Flecha (No pueden usarse para métodos o constructores)*/

const sayHi = (name, greeting = "hi") => `${greeting} ${name}`

/* Hoisting */
//Consiste en poder declarar funciones después de invocarlas
//Hay exepciones con const como el siguiente caso:
noHoisting("No funciona por ser const")
const noHoisting = function(printext) {
  console.log(printext)
}

/* High-order functions*/

/* High order functions for callbacks */
//callback es una funcion que se ejecuta al finalizar, es una high order porq recibe una función como parámetro
function doSomething(callback) {
  console.log("Doing something");
  callback();
}
function sayHello() {
  console.log("Hello");
}
doSomething(sayHello);

/* Objects */

//Asignar prototipo (clase)
Object.getPrototypeOf
//El prototipo sirve para la herencia al usar __proto__ en un
//object a otro object, le estoy heredando las clases y atributos

// Crear objeto (sam sería otro objeto, que hereda todo y cambia los valores que firstname y lastname)
const mark = Object.create(sam, {
  firstaname: {value: "Mark"},
  lastname : {value: "Twain"}
})
//Para crear objetos (forma compleja)
function Person(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName
}
Person.prototype.greet = function () {
  return `Hello ${this.firstName}`
}
const valen = new Person("Valentín","Cotorruelo")

//Herencia (con la forma compleja)
function Author(firstName,lastName, age, quote) {
  personalbar.call(this,firstName,lastName,)
  this.quote = quote
  this.age = age
}

Author.prototype = Object.create(Person.prototype)
Author.prototype.constructor = Author;

Author.prototype.sayQuote = function () {
  return `${this.quote}`
}

//Otra forma de construir objetos(mucho más simple)
const Person = {
  init(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.greet = function () {
      return `Hello, I'm ${this.firstName} ${this.lastName}`;
    };
  },
};

const Author = {
  __proto__: Person,
  init(firstName, lastName, age, quote) {
    Person.init.call(this, firstName, lastName, age);
    this.quote = quote;
    this.sayQuote = function () {
      return `"${this.quote}". ${this.firstName} ${this.lastName}`;
    };
  },
};

const sam = Object.create(Person);
sam.init('Sam', 'Clemens', 25);

const marko = Object.create(Author);
mark.init(
  'Mark',
  'Twain',
  25,
  'Never argue with stupid people, they will drag you down to their level and then beat you with experience.'
);
//Object factory (completar)

/* JSON */
