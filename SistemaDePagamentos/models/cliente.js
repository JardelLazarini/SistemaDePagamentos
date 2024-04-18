import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
