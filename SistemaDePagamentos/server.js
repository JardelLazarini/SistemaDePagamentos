import express from 'express';
import mongoose from 'mongoose';
import Cliente from './models/cliente.js';
import Pagamento from './models/pagamento.js';
import Divida from './models/divida.js';
import Contador from './models/contador.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/SistemaDePagamentos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão bem-sucedida com o MongoDB');
});

// Rotas para clientes

// Listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo cliente
app.post('/clientes', async (req, res) => {
  try {
    const novoCliente = new Cliente({ nome: req.body.nome, endereco: req.body.endereco });
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um cliente existente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Excluir um cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rotas para pagamentos

// Listar todos os pagamentos
app.get('/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo pagamento
app.post('/pagamentos', async (req, res) => {
  try {
    const novoPagamento = new Pagamento(req.body);
    const pagamentoSalvo = await novoPagamento.save();
    res.status(201).json(pagamentoSalvo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um pagamento existente
app.put('/pagamentos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pagamento = await Pagamento.findByIdAndUpdate(id, req.body, { new: true });
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    res.json(pagamento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Excluir um pagamento
app.delete('/pagamentos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pagamento = await Pagamento.findByIdAndDelete(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    res.json({ message: 'Pagamento excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rotas para dívidas

// Listar todas as dívidas
app.get('/dividas', async (req, res) => {
  try {
    const dividas = await Divida.find();
    res.json(dividas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar uma nova dívida
app.post('/dividas', async (req, res) => {
  try {
    const novaDivida = new Divida(req.body);
    const dividaSalva = await novaDivida.save();
    res.status(201).json(dividaSalva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar uma dívida existente
app.put('/dividas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const divida = await Divida.findByIdAndUpdate(id, req.body, { new: true });
    if (!divida) {
      return res.status(404).json({ message: 'Dívida não encontrada' });
    }
    res.json(divida);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Excluir uma dívida
app.delete('/dividas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const divida = await Divida.findByIdAndDelete(id);
    if (!divida) {
      return res.status(404).json({ message: 'Dívida não encontrada' });
    }
    res.json({ message: 'Dívida excluída com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
