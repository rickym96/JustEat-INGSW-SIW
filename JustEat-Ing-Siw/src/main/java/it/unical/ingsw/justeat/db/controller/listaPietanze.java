package it.unical.ingsw.justeat.db.controller;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.unical.ingsw.justeat.db.model.Pietanza;
import it.unical.ingsw.justeat.db.model.Ristorante;
import it.unical.ingsw.justeat.db.persistence.DAOFactory;
import it.unical.ingsw.justeat.db.persistence.dao.RistoranteDao;
import it.unical.ingsw.justeat.db.persistence.dao.UtenteDao;

public class listaPietanze extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String email=req.getParameter("email");
		
		DAOFactory factory=DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		RistoranteDao rd=factory.getRistoranteDAO();
		
		Ristorante ristorante=rd.findByEmail(email);
		
		List<Pietanza> pietanze= rd.pietanze_del_ristorante(ristorante);
		
		req.getSession().setAttribute("pietanze", pietanze);
		RequestDispatcher rde = req.getRequestDispatcher("menuForm.jsp");
		rde.forward(req, resp);
	}

}
