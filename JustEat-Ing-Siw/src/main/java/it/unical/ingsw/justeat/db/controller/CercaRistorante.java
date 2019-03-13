package it.unical.ingsw.justeat.db.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.unical.ingsw.justeat.db.model.Categoria;
import it.unical.ingsw.justeat.db.model.Ristorante;
import it.unical.ingsw.justeat.db.persistence.DAOFactory;
import it.unical.ingsw.justeat.db.persistence.DatabaseManager;
import it.unical.ingsw.justeat.db.persistence.dao.RistoranteDao;

public class CercaRistorante extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
		String citta = req.getParameter("citta");
		
		DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		RistoranteDao risDao = factory.getRistoranteDAO();
		List<Ristorante> ristor = risDao.findByCitta(citta);
		for(Ristorante r: ristor) {
		
			r.setCategorie(risDao.tipo_cucina(r));
			
		}
		
		
		
		
		req.setAttribute("ristoranti", ristor);
		
		
		RequestDispatcher rd = req.getRequestDispatcher("restaurants.jsp");
		rd.forward(req, resp);

	
	}


}
