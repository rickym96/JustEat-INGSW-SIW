package it.unical.ingsw.justeat.db.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.unical.ingsw.justeat.db.model.Utente;
import it.unical.ingsw.justeat.db.persistence.DAOFactory;
import it.unical.ingsw.justeat.db.persistence.dao.RistoranteDao;
import it.unical.ingsw.justeat.db.persistence.dao.TitolareDao;
import it.unical.ingsw.justeat.db.persistence.dao.UtenteDao;

public class registrazioneUtente extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


		
		String nome= req.getParameter("nome");
		String cognome=req.getParameter("cognome");
		String email=req.getParameter("email");
		String numero =req.getParameter("numero");
		String password=req.getParameter("password");
		
		Utente utente=new Utente(); 
		utente.setNome_Utente(nome);
		utente.setCognome_Utente(cognome);
		utente.setEmail_Utente(email);
		int numeroTel=Integer.parseInt(numero);
		utente.setNumero_telefono_utente(numeroTel);
		utente.setPassword(password);
		
		DAOFactory factory=DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		UtenteDao utenteDao=factory.getUtenteDAO();
		utenteDao.save(utente);
		
		RequestDispatcher rq=req.getRequestDispatcher("login.jsp");
		rq.forward(req, resp);
	}
	

}
