import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function NotasEscolares() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState("");

  useEffect(() => {
    axios.get("https://api-notas.onrender.com/alunos").then((res) => {
      setAlunos(res.data);
    });
  }, []);

  const adicionarNota = async () => {
    if (!nome || !nota) return toast.error("Preencha todos os campos");
    await axios.post("https://api-notas.onrender.com/alunos", { nome, nota });
    toast.success("Nota adicionada!");
    setNome("");
    setNota("");
  };

  const solicitarRevisao = async (id) => {
    await axios.post(`https://api-notas.onrender.com/alunos/${id}/revisao`);
    toast.success("Revisão solicitada!");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Notas</h1>
      <div className="mb-4 space-y-2">
        <Input
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-label="Nome do aluno"
        />
        <Input
          placeholder="Nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          type="number"
          aria-label="Nota"
        />
        <Button onClick={adicionarNota}>Adicionar Nota</Button>
      </div>
      <div className="space-y-4">
        {alunos.map((aluno) => (
          <Card key={aluno._id}>
            <CardContent className="p-4">
              <p><strong>Nome:</strong> {aluno.nome}</p>
              <p><strong>Nota:</strong> {aluno.nota}</p>
              <p><strong>Revisão:</strong> {aluno.revisao ? "Solicitada" : "Não"}</p>
              {!aluno.revisao && (
                <Button onClick={() => solicitarRevisao(aluno._id)}>
                  Solicitar Revisão
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}