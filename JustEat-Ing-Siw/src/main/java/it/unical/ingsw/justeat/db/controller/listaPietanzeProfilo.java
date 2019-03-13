package it.unical.ingsw.justeat.db.controller;

import java.io.IOException;
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

public class listaPietanzeProfilo  extends HttpServlet{
	
		
		@Override
		protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			String partita_iva=req.getParameter("partita_iva");
			
			DAOFactory factory=DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
			RistoranteDao rd=factory.getRistoranteDAO();
			
			Ristorante ristorante=rd.findByPrimaryKey(partita_iva);
			
			ristorante.setCategorie(rd.tipo_cucina(ristorante));
			List<Pietanza> pietanze= rd.pietanze_del_ristorante(ristorante);
			
			req.getSession().removeAttribute("carrello");
			req.getSession().setAttribute("pietanze", pietanze);
			req.getSession().setAttribute("tot", 0.0);
			req.getSession().setAttribute("ristor", ristorante);
			
		
			
			RequestDispatcher rde = req.getRequestDispatcher("restaurantProfile.jsp");
			rde.forward(req, resp);
		}

	
}
