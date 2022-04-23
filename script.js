
window.addEventListener('load', incio, true);

/*Creo la función removerAcentos y le asigno el parámetro texto,
retorno texto aplicando la función .normalize para quitar los acentos introducidos*/
function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
} 

/*Creo la variable patron que contiene los caracteres especiales que deben ser excluidos
del encriptador (con exepción de '-')*/
var patron = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;



/*Creo la función inicio y con document.getElementById asocio el id de las etiquetas de mi
html con JS...
aplico un .addEventListener para que cuando se introduzca el texto a encriptar se
modifique de acuerdo a los requisitos establecidos en el proyecto...
y para darle funcionalidad a los botones de encriptar/desencriptar */
function incio(){
	document.getElementById('mensaje').addEventListener('keyup',function(){
	  this.value = this.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    this.value = this.value.toLowerCase();
    this.value = this.value.replace(patron, '');
	},true);
	document.getElementById('cifrar').addEventListener('click', function(){
		var texto = document.getElementById('mensaje').value;
		document.getElementById('mensaje2').value = cifrar(texto);
	}, true);
	document.getElementById('descifrar').addEventListener('click', function(){
		var texto = document.getElementById('mensaje').value;
		document.getElementById('mensaje2').value = descifrar(texto);
	}, true);
}

/*Vinculo la etiqueta boton de html y le asigno la funcionalidad de copiar texto*/
function copiarTexto(){
    var texto = document.getElementById('mensaje2');
    texto.select();
    texto.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }



/*aplico la función cifrar para encriptar el texto recibido como parámetro
aplico .map para retornar un nuevo array con las vocales modificadas y retorno su
resultado */
function cifrar(texto) {
      var letras = texto.split('');

       var llaves = {
          a: 'ai',
          e: 'enter',
          i: 'imes',
          o: 'ober',
          u: 'ufat'
          };

      return cifrado = letras.map( letra => llaves[letra] ? llaves[letra] : letra).join('');}

/*'function cifrar(texto){
	var resultado = '';
	var letras = 'abcdefghijklmnopqrstuvwxyz';

	

		if(texto){
			for(let i = 0; i < texto.length; i++){

				if(letras.indexOf(texto[i])!=-1){
					let posicion = letras.indexOf(texto[i]);
					resultado += letras[posicion];
				}
				else resultado += texto[i];

			}

		}
		return resultado;
}
*/

/*para la desencriptación aplico la función descifrar y paso como parámetro texto
creo una variable que contenga una cadena vacía la cual será retornada al final.
Aplico un bucle for con variable j, que itera sobre la longitud del parámetro texto
Luego utilizo la declaración switch que evalúa la expresión (texto[j]) y la compara
con las instancias case para cada vocal. Aplico un if dentro de case 'e' y en caso
que la longitud (cuyo caracter inicial sea e) tenga como caracter final 'r' 
(propia de la encriptación... e -> 'enter'), añado la vocal 'e' a la cadena vacía
de la variable var r = '', caso contrario retorno falso. Aplico case para el resto
de las vocales (respetando la longitud y el caracter final).
En el caso que el parámetro no coincida con alguno de los case del swtich,
por defecto, incoporaremos esos valores a la cadena de la varibale r tal cual estén
originalmente.
Por último retornamos r con los cambios aplicados a las vocales.  */
function descifrar(texto) {
  var r = '';
  for (var j = 0; j < texto.length;j++) {
    switch(texto[j]) {
    case 'e': 
      if (texto[j + 4] === 'r') { r += 'e'; j += 4; }
      else { return false; }
      break;
    case 'i': 
      if (texto[j + 3] === 's') { r += 'i'; j += 3; }
      else { return false; }
      break;
    case 'a': 
      if (texto[j + 1] === 'i') { r += 'a'; j += 1; }
      else { return false; }
      break;
    case 'o': 
      if (texto[j + 3] === 'r') { r += 'o'; j += 3; }
      else { return false; }
      break;
    case 'u': 
      if (texto[j + 3] === 't') { r += 'u'; j += 3; }
      else { return false; }
      break;
    default:
      r += texto[j];
    }
  }
  return r;
}