export class Ticket {
  constructor(
    public idTicket: Number,
    public idCliente: Number,
    public nameCliente: String,
    public idOperator: Number,
    public nameOperator: String,
    public title: String,
    public description: String,
    public priority: Number,
    public statusId: Number,
    public namePriority: String,
    public status: String
    ){}
}
