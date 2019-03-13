package it.unical.ingsw.justeat.db.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.net.httpserver.HttpServer;

import it.unical.ingsw.justeat.db.model.Ordine;
import it.unical.ingsw.justeat.db.model.Ristorante;
import it.unical.ingsw.justeat.db.model.Utente;
import it.unical.ingsw.justeat.db.persistence.DAOFactory;
import it.unical.ingsw.justeat.db.persistence.dao.OrdineDao;
import it.unical.ingsw.justeat.db.persistence.dao.RistoranteDao;
import it.unical.ingsw.justeat.db.persistence.dao.UtenteDao;

public class listaOrdini extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//restituisce gli ordini di quell'utente loggato 
		//restituisce il ristorante presso il quale questi ordini sono stati fatti 
		//String nome_ristorante=req.getParameter("nome_ristorante");
		
		String email=req.getParameter("email");
		DAOFactory factory=DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		
		UtenteDao ud=factory.getUtenteDAO();
		Utente utente=ud.findByPrimaryKey(email);
		OrdineDao rd=factory.getOrdineDAO();
		
		
		List<Ordine> ordini=rd.ordini_dell_utente(utente);
		Collections.reverse(ordini);
		
		
		
		
	
		req.getSession().setAttribute("ordini", ordini);
	
		RequestDispatcher rde = req.getRequestDispatcher("userOrders.jsp");
		rde.forward(req, resp);
		
		
		
		
	}
}
