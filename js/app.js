//Variables Globales
var horizontal=0;
var vertical=0;
var nDulces=0;
var lencolum=["","","","","","",""];
var lenrest=["","","","","","",""];
var maximo=0;
var matriz=0;
var intervalo=0;
var eliminar=0;
var nuevosDulces=0;
var tiempo=0;
var i=0;
var contadorTotal=0;
var espera=0;
var score=0;
var mov=0;
var min=2;
var seg=0;
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

$(document).ready(function(){
	Blanco($(".main-titulo"));	//Asinacion de animacion al titulo
});
//--------------------------------------------------------

//----------Funcion para llenar de dulces el tablero----
function insertarImagenes(){
	for(var n = 1; n<8; n++){
		if($(".col-"+n).children("img:nth-child("+i+")").html() == null){
			var numero = Math.floor((Math.random() * 4) + 1);
			var imagen = "image/"+numero+".png";
			$(".col-"+n).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
		}
	}
}
//---------Fin de la Funciuon---------------------------

//----Funcion para recorrer columnas--------------------
function recorrerColumnas(){
	var columnas = 0
	for(var f=1; f<6; f++){
		for(var c=1; c<8; c++){
			 	imagen1 = $(".col-"+c).children("img:nth-child("+f+")").attr("src")
			 	imagen2 = $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
			 	imagen3 = $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")

			if((imagen1 == imagen2) && (imagen2 == imagen3) && (imagen1!=null) && (imagen2!=null) && (imagen3!=null)){
				$(".col-"+c).children("img:nth-child("+f+")").attr("class","elemento igual")
				$(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class","elemento igual")
				$(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class","elemento igual")

				columnas = 1
			}
		}
	}
	return columnas
}
//-----------------------------------------------------------------------
//--------------------Funcion para recorrer filas------------------------
function recorrerFilas(){
	var filas = 0
	for(var f=1; f<8; f++){
		for(var c=1; c<6; c++){
			imagen4 = $(".col-"+c).children("img:nth-last-child("+f+")").attr("src")
			imagen5 = $(".col-"+(c+1)).children("img:nth-last-child("+f+")").attr("src")
			imagen6 = $(".col-"+(c+2)).children("img:nth-last-child("+f+")").attr("src")

			if((imagen4 == imagen5) && (imagen5 == imagen6) && (imagen4 !=null) && (imagen5!=null) && (imagen6!=null)){
				$(".col-"+c).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")
				$(".col-"+(c+1)).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")
				$(".col-"+(c+2)).children("img:nth-last-child("+(f)+")").attr("class","elemento igual")

				filas = 1
			}
		}
	}
	return filas
}
//-------------------------------------------------------------------

//-----------Funcion para limpiar por completo el tablero----
function limpiarTablero(){
	for(var j=1; j<8; j++){
		$(".col-"+j).children("img").detach();
	}
}//----------------------------------------------------------

//---------Funcion para llenar el tablero---------------------
function llenadoTablero(){
	i = i+1
	$(".elemento").draggable({disabled: true})
	if(i<8){
		insertarImagenes()//llamado a la funcion para llenar el tablero de dulces	
	}
	if(i == 8){
		clearInterval(intervalo);
		eliminar = setInterval(function(){
			eliminarImagenes()
		},150);
	}
}//--------------------------------------------------------------

//-------------Funcion para el tiempo del Juego-------------------
function Tiempo(){
	
	if(seg != 0){
		seg = seg-1;
	}
	if(seg == 0){
		if(min == 0){
			clearInterval(eliminar);
			clearInterval(nuevosDulces);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",function(){
				$(".panel-score").animate(
					{
						width: '100%'
					},3000
				);
				$(".termino").css(
					{
						"displa":"block",
						"text-align":"center"
					}
				);
			});
			$(".time").hide();
		}
		seg = 59;
		min = min - 1;
	}
	$("#timer").html("0"+min+":"+seg);
}
//-----------------Fin del tiempo----------------------------------

//-----------Contendo de movimientos-------------------------------
function eliminarImagenes(){
	matriz=0;
	horizontal=recorrerFilas();
	vertical=recorrerColumnas();
	for(var j=1;j<8;j++){
		matriz=matriz+$(".col-"+j).children().length;
	}
	/*Condicional para ver si hay 3 o mas dulces sino se llama la funcion crearNuevosDulces() para rellenar
	los espacios vacios*/
	if(horizontal==0 && vertical==0 && matriz!=49){
		clearInterval(eliminar);
		nDulces=0;
		nuevosDulces=setInterval(function(){
			crearNuevosDulces()
		},600);	
	}

	if(horizontal==1||vertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".igual").hide("pulsate",1000,function(){
			var scoretmp=$(".igual").length;
			$(".igual").remove("img");
			score=score+scoretmp*10;
			$("#score-text").html(score);
		});
	}
	if(horizontal==0 && vertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mov=mov+1;
				$("#movimientos-text").html(mov);
			}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));
			}while(espera==0);

			horizontal=recorrerFilas();
			vertical=recorrerColumnas();
			if(horizontal==0 && vertical==0){
				dropped.swap($(droppedOn));
			}
			if(horizontal==1 || vertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminar);
				eliminar=setInterval(function(){
					eliminarImagenes()
				},150);
			}
		},
	});
}//-----------------------------------------------------------------

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
}
//---------Funcion para crear nuevos dulces-------------------------
function crearNuevosDulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		lencolum[j-1]=$(".col-"+j).children().length;
	}
	if(nDulces==0){
		for(var j=0;j<7;j++){
			lenrest[j]=(7-lencolum[j]);
		}
		maximo=Math.max.apply(null,lenrest);
		contadorTotal=maximo;
	}
	if(maximo!=0){
		if(nDulces==1){
			for(var j=1;j<8;j++){
				if(contadorTotal>(maximo-lenrest[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenrest[j-1])+")").remove("img");
				}
			}
		}
		if(nDulces==0){
			nDulces=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(lenrest[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");
				}
			}
		}
		for(var j=1;j<8;j++){
			if(contadorTotal>(maximo-lenrest[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");
			}
		}
	}
	if(contadorTotal==1){
		clearInterval(nuevosDulces);
		eliminar=setInterval(function(){
			eliminarImagenes()
		},150);
	}
	contadorTotal=contadorTotal-1;
}//-----------------------------------------------------------------

//-------Asigancion de eventos al hacer click en el boton inicio----
$(".btn-reinicio").click(function(){
	//reiniciando variables
	i = 0;								//
	score = 0;						//
	mov = 0;							//
	min = 2;							//
	seg = 0;							//
	//----------------------
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".timer").show();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar");
	
	
	clearInterval(intervalo);
	clearInterval(eliminar);
	clearInterval(nuevosDulces);
	clearInterval(tiempo);

	tiempo = setInterval(function(){
		Tiempo();
	},1000);
	limpiarTablero()
	intervalo = setInterval(function(){
		llenadoTablero()
	},600);
});
//-----------------------------------------------------

