export class Message {
  constructor(
    public idTicketMessages: Number,
    public idTicket: Number,
    public idUser: Number,
    public nameUser: String,
    public message: String,
    public dtSended: String
    ){}
}
