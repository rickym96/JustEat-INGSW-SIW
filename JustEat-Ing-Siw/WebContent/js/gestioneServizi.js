function Studente(matricola, nome, cognome, dataNascita){
	this.matricola = matricola;
	this.nome = nome;
	this.cognome = cognome;
	this.dataNascita = dataNascita;
}

//var stud = new Studente("103123", "Mario", "Rossi", new Date(1/7/2018));
//var stud2 = new Studente("123", "Giorgio", "Bianchi", new Date(1/7/2018));

//alert(stud.nome);


function operazioni(studente){
	alert("Inizio procedura calcolo ISEE per lo studente"
			+ studente.nome + " " + studente.cognome);
	var numeroComponenti = prompt("Inserisci il numero dei componenti");
	componentiReddito = new Array();
	componentiPatrimonio = new Array();
	
	var i;
	for (i = 0; i < numeroComponenti; i++){
		componentiReddito[i] = prompt("Inserisci il reddito del componente " + (i + 1));
		componentiPatrimonio[i] = prompt("Inserisci il patrimonio del componente " + (i + 1));
	}
	
	var redditoComplessivo = 0;
	var patrimonioComplessivo = 0;
	
	for (i = 0; i < numeroComponenti; i++){
		redditoComplessivo += parseInt(componentiReddito[i]);
		patrimonioComplessivo += parseInt(componentiPatrimonio[i]);
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
	
	reportISEECalcolato = "Report ISEE calcolato:\n";
	reportISEECalcolato += "Numero componenti nucleo familiare:" + numeroComponenti + "\n";
	reportISEECalcolato += "Reddito complessivo nucleo familiare:" + redditoComplessivo + "\n";
	reportISEECalcolato += "Patrimonio complessivo nucleo familiare:" + patrimonioComplessivo + "\n";
	reportISEECalcolato += "Valore ISE:" + ISE + "\n";
	reportISEECalcolato += "Scala equivalenza applicata:" + SE + "\n";
	reportISEECalcolato += "Valore ISEE:" + ISEE + "\n";
	
	alert(reportISEECalcolato);
}






	
	
	
	
	
	
	
	
	

