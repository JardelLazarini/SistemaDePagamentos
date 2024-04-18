import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

export default Pagamento;
