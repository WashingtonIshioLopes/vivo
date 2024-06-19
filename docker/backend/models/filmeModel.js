const pool = require('../database');
const { format } = require('date-fns');

const createFilme = async (filme, callback) => {
  try {
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    const [result] = await pool.query(`INSERT INTO filmes (IdUsuario, IdFilme, Favorito, Assistido, PretendeAssistir, Status, DtCreated, DtUpdated, DtDeleted)
                                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [filme.IdUsuario, filme.IdFilme, filme.Favorito, filme.Assistido, filme.PretendeAssistir, filme.Status, dtNow, null, null]);
    callback(null, { Id: result.insertId });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

const findFilmeById = async (id, callback) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM filmes WHERE Id = ? AND DtDeleted IS NULL`, [id]);
    callback(null, rows[0]);
  } catch (err) {
    callback(err);
  }
};

const findAllFilmes = async (callback) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM filmes WHERE DtDeleted IS NULL`);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
};

const findFilmeByIdAndUserId = async (idFilme, idUsuario, callback) => {
  try {
    const [rows] = await pool.query('SELECT * FROM filmes WHERE IdFilme = ? AND IdUsuario = ? AND DtDeleted IS NULL', [idFilme, idUsuario]);
    callback(null, rows[0]);
  } catch (err) {
    callback(err);
  }
};

const findFilmeByUserId = async (idUsuario, callback) => {
  try {
    const [rows] = await pool.query('SELECT * FROM filmes WHERE IdUsuario = ? AND DtDeleted IS NULL', [idUsuario]);
    callback(null, rows);
  } catch (err) {
    callback(err);
  }
};

const updateFilme = async (id, filme, callback) => {
  try {
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const [result] = await pool.query(`UPDATE filmes SET IdUsuario = ?, IdFilme = ?, Favorito = ?, Assistido = ?, PretendeAssistir = ?, Status = ?, DtUpdated = ? WHERE Id = ? AND DtDeleted IS NULL`,
                                      [filme.IdUsuario, filme.IdFilme, filme.Favorito, filme.Assistido, filme.PretendeAssistir, filme.Status, dtNow, id]);
    callback(null, { changes: result.affectedRows });
  } catch (err) {
    callback(err);
  }
};

const deleteFilme = async (id, callback) => {
  try {
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const [result] = await pool.query(`UPDATE filmes SET DtDeleted = ? WHERE Id = ?`, [dtNow, id]);
    callback(null, { changes: result.affectedRows });
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createFilme,
  findFilmeById,
  findAllFilmes,
  findFilmeByIdAndUserId,
  findFilmeByUserId,
  updateFilme,
  deleteFilme
};
