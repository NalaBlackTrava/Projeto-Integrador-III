const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://...", { useNewUrlParser: true, useUnifiedTopology: true });

const alunoSchema = new mongoose.Schema({
  nome: String,
  nota: Number,
  revisao: { type: Boolean, default: false },
});

const Aluno = mongoose.model("Aluno", alunoSchema);

app.use(cors());
app.use(express.json());

app.get("/alunos", async (_, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

app.post("/alunos", async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.json(aluno);
});

app.post("/alunos/:id/revisao", async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  aluno.revisao = true;
  await aluno.save();
  res.json(aluno);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));