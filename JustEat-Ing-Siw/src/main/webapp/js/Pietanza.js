function pietanza(nome, prezzo, descrizione){
	this.nome = nome;
	this.prezzo = prezzo;
	this.descrizione = descrizione;
	
}

function eliminaPietanza(piet){
	var p = {
			nome : piet.nome,
			prezzo: piet.prezzo,
			descrizione: piet.descrizione
		};
	
	$.ajax({
		type: "POST",
		url: "eliminapietanza",
		datatype: "json",
		data: JSON.stringify(p),
		success: function (data){
			alert("La pietanza "+ p.nome+"e' stata eliminata con successo!");
			
			$('#'+p.nome).remove();
		}
	});
}




function aggiungiPietanza(piet){
	var p = {
			nome : piet.nome,
			prezzo: piet.prezzo,
			descrizione: piet.descrizione
		};

	$.ajax({
		type: "POST",
		url: "AggiungiAlCarrelloTemp",
		datatype: "json",
		data: JSON.stringify(p),
		success: function (data){
			alert("La pietanza "+ p.nome+" e' stata aggiunta al tuo carrello con successo!");
			carrello(p);
		
		}
	});
}


function carrello(piet){	
	var x=null;
	var i=0;
	x=document.getElementById("div"+i);
	while(x!=null)
	{
		i+=4;
		x=document.getElementById("div"+i);
	}
	
	/*<div class="title-row">${car.getNome()}<a href="togliUnaPietanza?nome=${car.getNome()}"><em class="fa fa-trash pull-right"></em></a></div>*/
	var div1 = document.createElement("div");
	div1.setAttribute('class', 'mytitle-row');
	div1.setAttribute('id', 'div'+i);
	div1.innerHTML = piet.nome;
	
	var a1=document.createElement("a");
	a1.setAttribute('id', 'a'+i);
	
	/*var em1=document.createElement("em");
	em1.setAttribute('class', 'fa fa-trash pull-right');
	em1.setAttribute('id', 'em'+i);*/
	//<input id="payment-nav-link" type="button" value="&#43" onClick="piet=new pietanza('${pasto.getNome()}',${pasto.getPrezzo()},'${pasto.getDescrizione()}'); aggiungiPietanza(piet);"></input>
	
	var input=document.createElement("input");
	input.setAttribute('id', 'input'+i);
	input.setAttribute('type', 'button');
	input.setAttribute('class', 'fa fa-trash pull-right');
	input.setAttribute('value', 'elimina');
	var j=Number(i)+1;
	input.setAttribute('onCLick', "piet=new pietanza('"+ piet.nome + "',"+ piet.prezzo+ ", '" + piet.descrizione +"'); rimuoviPietanzaDalCarrello(piet, 'div"+ i +"', 'div" + j +"');");
	
	document.getElementById("carrel").appendChild(div1);
	document.getElementById("div"+i).appendChild(a1);
	document.getElementById("a"+i).appendChild(input);
	
	
	/*<div class="form-group row no-gutter">
   <div class="col-xs-8"> </div>
   <div class="col-xs-4">
      <h6>Prezzo: ${car.getPrezzo()}</h6> 
   </div>
</div> */
	i+=1;
	var div2 = document.createElement("div");
	div2.setAttribute('class', 'form-group row no-gutter');
	div2.setAttribute('id', 'div'+i);
	document.getElementById("carrel").appendChild(div2);
	
	i+=1;
	var div3 = document.createElement("div");
	div3.setAttribute('class', 'col-xs-8');
	div3.setAttribute('id', 'div'+i);
	document.getElementById("div"+(i-1)).appendChild(div3);
	
	i+=1;
	var div4 = document.createElement("div");
	div4.setAttribute('class', 'col-xs-4');
	div4.setAttribute('id', 'div'+i);
	document.getElementById("div"+(i-2)).appendChild(div4);
	
	var h6=document.createElement("h6");
	h6.innerHTML ="Prezzo: € "+ piet.prezzo+ ".0";
	document.getElementById("div"+(i)).appendChild(h6);
	
	addTot(piet);
	
	
}

function addTot(piet){
	var pippo=document.getElementById("strongInnerDiv");
	var totale=Number(pippo.innerHTML);
	var prezzo=Number(piet.prezzo);
	var tot= totale + prezzo;
	pippo.innerHTML =tot+".0";
}

function pullTot(piet){
	var pippo=document.getElementById("strongInnerDiv");
	var totale=Number(pippo.innerHTML);
	var prezzo=Number(piet.prezzo);
	var tot= totale - prezzo;
	pippo.innerHTML =tot+".0";
}


function rimuoviPietanzaDalCarrello(piet, id1, id2){
	var p = {
			nome : piet.nome,
			prezzo: piet.prezzo,
			descrizione: piet.descrizione
		};
	
	$.ajax({
		type: "POST",
		url: "togliUnaPietanza",
		datatype: "json",
		data: JSON.stringify(p),
		success: function (data){
			alert("La pietanza "+ p.nome+" e' stata eliminata dal tuo carrello con successo!");
			eliminaDalcarrello(p, id1, id2);
			
		
		}
	});
}

 function eliminaDalcarrello(piet, id1, id2){
	 $('#'+id1).remove();
	 $('#'+id2).remove();
	 pullTot(piet);
		
 }

