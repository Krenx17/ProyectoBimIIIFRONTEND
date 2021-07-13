export class Team{
  constructor(
    public _id: String,
    public image: String,
    public torneo: String,
    public nombre: String,
    public puntos: Number,
    public golesfavor: Number,
    public golescontra: Number,
    public diferenciagoles: Number,
    public partidosjugados: Number
  ){}
}
