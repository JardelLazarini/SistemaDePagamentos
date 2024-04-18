import mongoose from 'mongoose';

const dividaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
});

const Divida = mongoose.model('Divida', dividaSchema);

export default Divida;
