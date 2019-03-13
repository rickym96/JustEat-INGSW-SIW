package it.unical.ingsw.justeat.db.persistence;
//modificato
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import it.unical.ingsw.justeat.db.factory.exception.PersistenceException;
import it.unical.ingsw.justeat.db.model.Categoria;
import it.unical.ingsw.justeat.db.persistence.dao.CategoriaDao;

public class CategoriaDaoJDBC implements CategoriaDao {
	private DataSource dataSource;

	public CategoriaDaoJDBC(DataSource dataSource) {

		this.dataSource = dataSource;
	}

	@Override
	public void save(Categoria categoria) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into categoria(id_categoria, nome_categoria) values (?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setInt(1, categoria.getId_Categoria());
			statement.setString(2, categoria.getNome_Categoria());

			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
	}

	@Override
	public Categoria findByPrimaryKey(int id) {

		Connection connection = this.dataSource.getConnection();
		Categoria categoria = null;
		try {
			PreparedStatement statement;
			String query = "select * from categoria where id_categoria= ?";
			statement = connection.prepareStatement(query);
			statement.setInt(1, id);
			ResultSet result = statement.executeQuery();
			if (result.next()) {

				categoria = new Categoria();
				categoria.setId_Categoria(result.getInt("id_categoria"));
				categoria.setNome_Categoria(result.getString("nome_categoria"));

			}
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		return categoria;
	}

	@Override
	public void update(Categoria categoria) {
		Connection connection = this.dataSource.getConnection();
		try {
			String update = "update  categoria SET  nome_categoria=? WHERE id_categoria=?";
			PreparedStatement statement = connection.prepareStatement(update);
		
			statement.setString(1, categoria.getNome_Categoria());
			statement.setInt(2, categoria.getId_Categoria());

			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}

	}

	@Override
	public void delete(Categoria categoria) {
		Connection connection = this.dataSource.getConnection();
		try {
			String delete = "delete FROM categoria WHERE id_categoria = ? ";
			PreparedStatement statement = connection.prepareStatement(delete);
			statement.setInt(2, categoria.getId_Categoria());
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
	}
	
	@Override
	public void delete_tipo_cucina(int id, String partita_iva) {
		Connection connection = this.dataSource.getConnection();
		try {
			String delete = "delete FROM tipo_cucina WHERE id_categoria_cucina = ? and partita_iva_ristorante_tipo_cucina=?";
			PreparedStatement statement = connection.prepareStatement(delete);
			statement.setInt(1, id);
			statement.setString(2, partita_iva);
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
	}

	
	@Override
	public void tipo_cucina_ristorante(int id, String partita_iva) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into tipo_cucina(partita_iva_ristorante_tipo_cucina, id_categoria_cucina) values (?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setString(1, partita_iva);
			statement.setInt(2, id);

			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		
	}
}
