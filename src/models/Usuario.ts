import Postagem  from "./Postagem";

export default interface Usuario {
  id: number;
  usuario: string;
  nome: string;
  senha:string;
  foto: string;
  dataNascimento:string;
  postagem?: Postagem | null;
}