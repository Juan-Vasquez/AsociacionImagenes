//Variables Globales
var eliminar = 0;
var buscarNuevosDulces = 0;
var nuevosDulces = 0;
var tiempo = 0;
var min = 2;
var seg = 0;
//-------------------------


//Animacion que cambia color al titulo Match Game
function Blanco(elemento){
	$(elemento).animate(
		{
			color: '#FDFEFE'
		},500,function(){
			Amarillo(elemento)
		}
	)
}

function Amarillo(elemento){
	$(elemento).animate(
		{
			color: '#DCFF0E'
		},1000,function(){
			Blanco(elemento)
		}
	)
}
//------------------------------------------------------	
//----------Funcion para llenar de dulces el tablero----
function insertarImagenes(){
	$("[class ^='col-']").html(function(){
		for(var j = 0; j <= 7; j++){
			var	numero = Math.floor((Math.random() * 4) + 1);
			var imagen = "image/" + numero + ".png";
			$(".col-" + j).prepend("<img src=" + imagen + " class='elemento'/>");
		}
	});
}
//---------Fin de la Funciuon---------------------------

//----Funcion para recorrer columnas--------------------
function recorrerColumnas(){
	var columnas = false
	for(var f=1; f<6; f++){
		for(var c=1; c<8; c++){
			 	imagen1 = $(".col-"+c).children("img:nth-child("+f+")").attr("src")
			 	imagen2 = $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
			 	imagen3 = $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")

			if((imagen1 == imagen2) && (imagen2 == imagen3)){
				$(".col-"+c).children("img:nth-child("+f+")").attr("class","elemento igual")
				$(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class","elemento igual")
				$(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class","elemento igual")

				columnas = true
			}
		}
	}
	return columnas
}
//------------Fin FuncionRecorrer-------------------------
//-----Funcion para recorrer filas------------------------
function recorrerFilas(){
	var filas = false
	for(var f=1; f<8; f++){
		for(var c=1; c<6; c++){
			imagen4 = $(".col-"+c).children("img:nth-last-child("+f+")").attr("src")
			imagen5 = $(".col-"+(c+1)).children("img:nth-last-child("+f+")").attr("src")
			imagen6 = $(".col-"+(c+2)).children("img:nth-last-child("+f+")").attr("src")

			if((imagen4 == imagen5) && (imagen5 == imagen6)){
				$(".col-"+c).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")
				$(".col-"+(c+1)).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")
				$(".col-"+(c+2)).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")

				filas = true
			}
		}
	}
	return filas
}
//--------------Fin FuncionRecorrer--------------------------

function eliminarColumnas(){
	if(recorrerColumnas()){
		$("img").detach('.igual');
	}
}

function eliminarFilas(){
	if(recorrerFilas()){
		$("img").detach('.igual')
	}
}

function eliminar(){
	eliminarColumnas()
	eliminarFilas()
}

//-------------Funcion para el tiempo del Juego-------------------
function Tiempo(){
	
	if(seg != 0){
		seg = seg-1;
	}
	if(seg == 0){
		if(min == 0){
			$(".panel-tablero").hide("drop","slow",animacionPantalla);
			$(".time").hide();
		}
		seg = 59;
		min = min - 1;
	}
	$("#timer").html("0"+min+":"+seg);
}
//-----------------Fin del tiempo----------------------------------

//---------Funcion para Colocar en toda la pantalla la animacion---
function animacionPantalla(){
	$(".panel-score").animate(
		{
			width: '100%'
		},3000
	);
	$(".termino	").css({"display":"block","text-align":"center"});
}
//---------Fin de la Funcion---------------------------------------

$(".btn-reinicio").click(function(){

	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".timer").show();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar");
	insertarImagenes();
	tiempo = setInterval(function(){
		Tiempo();
	},1000);
});

// Evento para el titulo Match Game
$(document).ready(function(){
	Blanco($(".main-titulo"));	
});





