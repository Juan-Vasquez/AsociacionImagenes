//Evento que cambia color al titulo Match Game
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
$(document).ready(function(){
	Blanco($(".main-titulo"));// Evento para el titulo Match Game
	//Evento para mostrar las imagenes aleatoriamente en el panel
	$("[class ^='col-']").append(function(){
		for (var j = 0; j < 7; j++) {
			if ($(".col-" + j).children("img:nth-child(" + j + ")").html() == null) {
				numero = Math.floor(Math.random() * 4) + 1;
				imagen = "image/" + numero + ".png";
				$(".col-" + j).after("<img src=" + imagen + " class='elemento'/>");
			}
		}			
	});

});

$(function(){
	$(".elemento").draggable();


	
});

