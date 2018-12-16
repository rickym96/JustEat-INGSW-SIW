function maschera(studente){
	svuota();
	document.getElementById("selStudente").innerHTML =
		"<h4>" + studente.matricola + " : "
		+ studente.nome + " : "
		+ studente.cognome + " </h4> ";
	var numComponenti = document.getElementById("numComponenti");
	numComponenti.addEventListener("blur", aggiungiCaselle);
	var butCalcola = document.getElementById("calcolaISEE");
	butCalcola.addEventListener("click", calcolaISEE);
	
}

function aggiungiCaselle(){
	var numComponenti = document.getElementById("numComponenti");
	var nComp = numComponenti.value;
	
	var tagValori = document.getElementById("valori");
	
	svuota();
	
	for (var i = 0; i < nComp; i++){
		var redd = document.createElement("div");
		redd.setAttribute("class", "form-group");
		redd.innerHTML = "<label>REDDITO del componente:</label>" +
				"<input class='redditoComponente' type='text' " +
				"class='form-control' />";
		
		var patr = document.createElement("div");
		patr.setAttribute("class", "form-group");
		patr.innerHTML = "<label>PATRIMONIO del componente:</label>" +
				"<input class='patrimonioComponente' type='text' " +
				"class='form-control' />";
		
		tagValori.appendChild(redd);
		tagValori.insertBefore(patr, redd.nextSibling);
//		tagValori.appendChild(patr);
	}
}

function svuota(){
	var tagValori = document.getElementById("valori");
	while (tagValori.firstChild){
		tagValori.removeChild(tagValori.firstChild);
	}
}

function calcolaISEE(){
	
	var tagNumComponenti = document.getElementById("numComponenti");
	
	//var numeroComponenti = prompt("Inserisci il numero dei componenti");
	var numeroComponenti = parseInt(tagNumComponenti.value);
	
	var redditi = document.getElementsByClassName("redditoComponente");
	var patrimoni = document.getElementsByClassName("patrimonioComponente");
	
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
	
	document.getElementById("ISR").innerHTML = ISR;
	document.getElementById("ISP").innerHTML = ISP;
	document.getElementById("ISE").innerHTML = ISE;
	document.getElementById("scalaEquivalenza").innerHTML = SE;
	document.getElementById("ISEE").innerHTML = ISEE;
}














