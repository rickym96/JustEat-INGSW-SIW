function maschera(studente){
	svuota();
	$("#selStudente").html(
			"<h4>" + studente.matricola + " : "
			+ studente.nome + " : "
			+ studente.cognome + " </h4> ");
	//document.getElementById("selStudente").innerHTML =
	//	"<h4>" + studente.matricola + " : "
	//	+ studente.nome + " : "
	//	+ studente.cognome + " </h4> ";
	var numComponenti = $("#numComponenti");
	numComponenti.on("blur", aggiungiCaselle);
	var butCalcola = $("#calcolaISEE");
	butCalcola.on("click", calcolaISEE);
	
}

function aggiungiCaselle(){
	var numComponenti = $("#numComponenti");
	var nComp = numComponenti.val();
	
	var tagValori = $("#valori");
	
	svuota();
	
	for (var i = 0; i < parseInt(nComp); i++){
		var redd = $("<div></div>");
		redd.addClass("form-group");
		redd.html("<label>REDDITO del componente:</label>" +
				"<input class='redditoComponente' type='text' " +
				"class='form-control' />");
		
		var patr = $("<div></div>");
		patr.addClass("form-group");
		patr.html("<label>PATRIMONIO del componente:</label>" +
				"<input class='patrimonioComponente' type='text' " +
				"class='form-control' />");
		
		tagValori.append(redd);
		redd.after(patr);
	}
}

function svuota(){
	var tagValori = $("#valori");
	tagValori.empty();
	
	$("#ISR").text("");
	$("#ISP").text("");
	$("#ISE").text("");
	$("#scalaEquivalenza").text("");
	$("#ISEE").text("");
}

function calcolaISEE(){
	
	var tagNumComponenti = $("#numComponenti");
	
	//var numeroComponenti = prompt("Inserisci il numero dei componenti");
	var numeroComponenti = parseInt(tagNumComponenti.val());
	
	var redditi = $(".redditoComponente");
	var patrimoni = $(".patrimonioComponente");
	
	var redditoComplessivo = 0;
	var patrimonioComplessivo = 0;
	
	
	for (var i = 0; i < redditi.length; i++){
		redditoComplessivo += parseInt(redditi[i].value);
		patrimonioComplessivo += parseInt(patrimoni[i].value);
	}
	
	ISR = redditoComplessivo;
	ISP = patrimonioComplessivo;
	
	ISE = ISR + ISP * 20/100;
		
	scaleEquivalenza =
	{
			"1" : 1,
			"2" : 1.57,
			"3" : 2.04,
			"4" : 2.46,
			"5" : 2.85
	};
	
	
	
	var calcolaSe = function(numeroComponenti){
		var SE;
		switch (parseInt(numeroComponenti)){
		case 1:
			SE = 1;
			break;
		case 2:
			SE = 1.57;
			break;
		case 3:
			SE = 2.04;
			break;
		case 4:
			SE = 2.46;
			break;
		case 5:
			SE = 2.85;
			break;
		}
		return SE;
	}
	
	SE = calcolaSe(numeroComponenti);
	//alert("SIIIIIIIIIIIII");
	ISEE = ISE / SE;
	
//	reportISEECalcolato = "Report ISEE calcolato:\n";
//	reportISEECalcolato += "Numero componenti nucleo familiare:" + numeroComponenti + "\n";
//	reportISEECalcolato += "Reddito complessivo nucleo familiare:" + redditoComplessivo + "\n";
//	reportISEECalcolato += "Patrimonio complessivo nucleo familiare:" + patrimonioComplessivo + "\n";
//	reportISEECalcolato += "Valore ISE:" + ISE + "\n";
//	reportISEECalcolato += "Scala equivalenza applicata:" + SE + "\n";
//	reportISEECalcolato += "Valore ISEE:" + ISEE + "\n";
//	
//	alert(reportISEECalcolato);
	
	$("#ISR").text(ISR);
	$("#ISP").text(ISP);
	$("#ISE").text(ISE);
	$("#scalaEquivalenza").text(SE);
	$("#ISEE").text(ISEE);
}














