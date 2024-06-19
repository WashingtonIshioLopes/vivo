const filmeModel = require('../models/filmeModel');

const createFilme = (req, res) => {
  const newFilme = req.body;
  filmeModel.createFilme(newFilme, (err, result) => {
    if (err) {
      return res.status(500).send('There was a problem creating the film.');
    }
    res.status(201).send(result);
  });
};

const getFilmeById = (req, res) => {
  const id = req.params.id;
  filmeModel.findFilmeById(id, (err, filme) => {
    if (err) {
      return res.status(500).send('There was a problem finding the film.');
    }
    if (!filme) {
      return res.status(404).send('No film found.');
    }
    res.status(200).send(filme);
  });
};

const getAllFilmes = (req, res) => {
    filmeModel.findAllFilmes((err, filmes) => {
      if (err) {
        return res.status(500).send('There was a problem retrieving the films.');
      }
      res.status(200).send(filmes);
    });
};

  /*const getFilmeByIdAndUserId = (req, res) => {
    const idFilme = req.params.idFilme;
    const idUsuario = req.params.idUsuario;
    db.query('SELECT * FROM filmes WHERE IdFilme = ? AND IdUsuario = ?', [idFilme, idUsuario], (err, results) => {
      if (err) {
        console.error('Error fetching movie by Id and UserId:', err);
        res.status(500).send('Error fetching movie by Id and UserId');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Movie not found for the given IdFilme and IdUsuario');
        return;
      }
      res.status(200).json(results[0]);
    });
  };*/

  
const getFilmeByIdAndUserId = (req, res) => {
    const idFilme = req.params.idFilme;
    const idUsuario = req.params.idUsuario;
    console.log(idFilme);
    console.log(idUsuario);
    filmeModel.findFilmeByIdAndUserId(idFilme, idUsuario, (err, result) => {
      if (err) {
        console.log("erro");
        return res.status(500).send('There was a problem finding the film.');
      }
      console.log("ok");
      res.status(200).send(result);
    });
};

const getFilmeByUserId = (req, res) => {
  const idUsuario = req.params.idUsuario;
  console.log(idUsuario);
  filmeModel.findFilmeByUserId(idUsuario, (err, result) => {
    if (err) {
      console.log("erro");
      return res.status(500).send('There was a problem finding the film.');
    }
    console.log("ok");
    res.status(200).send(result);
  });
};

const updateFilme = (req, res) => {
  const id = req.params.id;
  const updatedFilme = req.body;
  filmeModel.updateFilme(id, updatedFilme, (err, result) => {
    if (err) {
      return res.status(500).send('There was a problem updating the film.');
    }
    res.status(200).send(result);
  });
};

const deleteFilme = (req, res) => {
  const id = req.params.id;
  filmeModel.deleteFilme(id, (err, result) => {
    if (err) {
      return res.status(500).send('There was a problem deleting the film.');
    }
    res.status(200).send(result);
  });
};

module.exports = {
  createFilme,
  getFilmeById,
  getAllFilmes,
  getFilmeByIdAndUserId,
  getFilmeByUserId,
  updateFilme,
  deleteFilme
};
