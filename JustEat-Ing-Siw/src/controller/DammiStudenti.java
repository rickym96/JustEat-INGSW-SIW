package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Studente;

public class DammiStudenti extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, 
			HttpServletResponse resp) throws ServletException, IOException {
		
		resp.getWriter().println("<h1>OK</h1>");
		
		RequestDispatcher rd = req.getRequestDispatcher
				("gestioneStudenti/studenti.html");
		rd.include(req, resp);
		
	}
}
