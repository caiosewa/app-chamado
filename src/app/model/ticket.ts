export class Ticket {
  constructor(
    public id: String,
    public titulo: String,
    public descricao: String,
    public status: String,
    public prioridade: String,
    public solicitante: String
    ){}
}
