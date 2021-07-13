export class Tournament{
  constructor(
    public _id: String,
    public nombre: String,
    public creador: String,
    public cantequipos: Number,
    public partidosajugar: Number,
    public jornadas: Number
  ){}
}
