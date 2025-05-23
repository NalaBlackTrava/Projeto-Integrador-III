const request = require("supertest");
const express = require("express");

// Simula app e rota de criação de aluno
const app = express();
app.use(express.json());
app.post("/alunos", (req, res) => {
  const { nome, nota } = req.body;
  if (!nome || nota == null) return res.status(400).send("Dados obrigatórios");
  return res.status(201).json({ nome, nota, revisao: false });
});

describe("POST /alunos", () => {
  it("deve criar um aluno com sucesso", async () => {
    const aluno = { nome: "Maria", nota: 8 };
    const res = await request(app).post("/alunos").send(aluno);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ nome: "Maria", nota: 8, revisao: false });
  });

  it("deve falhar se faltar dados", async () => {
    const res = await request(app).post("/alunos").send({ nome: "" });
    expect(res.statusCode).toBe(400);
  });
});
