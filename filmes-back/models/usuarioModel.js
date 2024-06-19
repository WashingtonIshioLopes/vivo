const pool = require('../database');
const bcrypt = require('bcryptjs');
const { format } = require('date-fns');

const createUser = async (user, callback) => {
  try {
    const hashedPassword = bcrypt.hashSync(user.Senha, 8);
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    const [result] = await pool.query(`INSERT INTO usuarios (Nome, CPF, Telefone, Email, Senha, Status, DtCreated, DtUpdated, DtDeleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user.Nome, user.CPF, user.Telefone, user.Email, hashedPassword, user.Status, dtNow, null, null]);
    callback(null, { Id: result.insertId });
  } catch (err) {
    callback(err);
  }
};

const findUserById = async (id, callback) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE Id = ? AND DtDeleted IS NULL`, [id]);
    callback(null, rows[0]);
  } catch (err) {
    callback(err);
  }
};

const findUserByCPF = async (cpf, callback) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE CPF = ? AND DtDeleted IS NULL`, [cpf]);
    callback(null, rows[0]);
  } catch (err) {
    callback(err);
  }
};

const findUserByEmail = async (email, callback) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE Email = ? AND DtDeleted IS NULL`, [email]);
    callback(null, rows[0]);
  } catch (err) {
    callback(err);
  }
};


const updateUser = async (id, user, callback) => {
  try {
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    const [result] = await pool.query(`UPDATE usuarios SET Nome = ?, CPF = ?, Telefone = ?, Email = ?, Status = ?, DtUpdated = ? WHERE Id = ? AND DtDeleted IS NULL`,
                                      [user.Nome, user.CPF, user.Telefone, user.Email, user.Status, dtNow, id]);
    callback(null, { changes: result.affectedRows });
  } catch (err) {
    callback(err);
  }
};

const deleteUser = async (id, callback) => {
  try {
    const dtNow = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); 
    const [result] = await pool.query(`UPDATE usuarios SET DtDeleted = ? WHERE Id = ?`, [dtNow, id]);
    callback(null, { changes: result.affectedRows });
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  createUser,
  findUserById,
  findUserByCPF,
  findUserByEmail,
  updateUser,
  deleteUser
};
