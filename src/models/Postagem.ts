import Tema from './Tema';
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  materia: string;
  titulo: string;
  texto: string;
  midia: string;
  disponivel:boolean;
  data: string;
  tema: Tema | null;
  usuario: Usuario | null;
}