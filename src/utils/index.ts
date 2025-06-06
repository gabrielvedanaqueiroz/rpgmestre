
//metodo para mostrar uma imagem dependendo da classe do personagem
export function getImagem(aClasse: number){

    let url = '';
    switch (Number(aClasse)) {
      case 1:
        url = require('../res/cl-barbaro.svg').default;
      break;
      case 2:
        url = require('../res/cl-bardo.svg').default;
      break;
      case 3:
        url = require('../res/cl-bruxo.svg').default;
      break;
      case 4:
        url = require('../res/cl-clerigo.svg').default;
      break;
      case 5:
        url = require('../res/cl-druida.svg').default;
      break;
      case 6:
        url = require('../res/cl-feiticeiro.svg').default;
      break;
      case 7:
        url = require('../res/cl-guerreiro.svg').default;
      break;
      case 8:
        url = require('../res/cl-ladino.svg').default;
      break;
      case 9:
        url = require('../res/cl-mago.svg').default;
      break;
      case 10:
        url = require('../res/cl-monge.svg').default;  
      break;
      case 11:
        url = require('../res/cl-paladino.svg').default;
      break;
      case 12:
        url = require('../res/cl-guardiao.svg').default; 
        break;
      default:
        url = require('../res/monstro.svg').default; 
        break;
    }
 
    return url;
}


//LIMITES DE XP POR NÍVEL DE PERSONAGEM recomendado
const jXPDificuldade = {
  "1": { "fácil": 25, "médio": 50, "difícil": 75, "mortal": 100 },
  "2": { "fácil": 50, "médio": 100, "difícil": 150, "mortal": 200 },
  "3": { "fácil": 75, "médio": 150, "difícil": 225, "mortal": 400 },
  "4": { "fácil": 125, "médio": 250, "difícil": 375, "mortal": 500 },
  "5": { "fácil": 250, "médio": 500, "difícil": 750, "mortal": 1100 },
  "6": { "fácil": 300, "médio": 600, "difícil": 900, "mortal": 1400 },
  "7": { "fácil": 350, "médio": 750, "difícil": 1100, "mortal": 1700 },
  "8": { "fácil": 450, "médio": 900, "difícil": 1400, "mortal": 2100 },
  "9": { "fácil": 550, "médio": 1100, "difícil": 1600, "mortal": 2400 },
  "10": { "fácil": 600, "médio": 1200, "difícil": 1800, "mortal": 2800 },
  "11": { "fácil": 800, "médio": 1600, "difícil": 2400, "mortal": 3600 },
  "12": { "fácil": 1000, "médio": 2000, "difícil": 3000, "mortal": 4500 },
  "13": { "fácil": 1100, "médio": 2200, "difícil": 3400, "mortal": 5100 },
  "14": { "fácil": 1250, "médio": 2500, "difícil": 3800, "mortal": 5700 },
  "15": { "fácil": 1400, "médio": 2800, "difícil": 4300, "mortal": 6400 },
  "16": { "fácil": 1600, "médio": 3200, "difícil": 4800, "mortal": 7200 },
  "17": { "fácil": 2000, "médio": 3900, "difícil": 5900, "mortal": 8800 },
  "18": { "fácil": 2100, "médio": 4200, "difícil": 6300, "mortal": 9500 },
  "19": { "fácil": 2400, "médio": 4900, "difícil": 7300, "mortal": 10900 },
  "20": { "fácil": 2800, "médio": 5700, "difícil": 8500, "mortal": 12700 }
}

const jMultiplicadorEncontro = [
  {"monstro": "1", "multiplicador":1 },
  {"monstro": "2", "multiplicador":1.5 },
  {"monstro": "3, 4, 5, 6", "multiplicador":2 },
  {"monstro": "7, 8, 9, 10", "multiplicador":2.5 },
  {"monstro": "11, 12, 13, 14", "multiplicador":3 },
  {"monstro": "15", "multiplicador":4 }
]

export function buscarMultiplicadorEncontro(monstroQnt : number) {

  if(monstroQnt >= 15)
    return 4;
  else{
    const alvo = String(monstroQnt)

    for (let item of jMultiplicadorEncontro) {
      const qnts = item.monstro.split(',').map(qnt => qnt.trim())
      if (qnts.includes(alvo)) {
        return item.multiplicador
      }
    }
  }

}

export interface PersonagemProps{
  pe_id: string;
  pe_nome:string;
  pe_idclasse:number;
  pe_idraca:number;
  pe_classe:string;
  pe_catotal:number;
  pe_vidaatual:number;
  pe_vidabase?:number;
  pe_vidadado?: string;
  pe_nivel?:number;
  pe_raca?:string;
  pe_subraca?:string;
  pe_subclasse?:string;
  pe_tendencia?: string;
  pe_antecedente?: string;
  pe_ativo?: boolean;
  pe_experiencia?:number;
  pe_bproficiencia?:number;
  pe_cabase?:number;
  pe_carisma?:number;
  pe_constituicao?:number;
  pe_destreza?:number;
  pe_forca?:number;
  pe_inteligencia?:number;
  pe_sabedoria?:number;
  pe_idhabilidadeconjuracao?:number;
  pe_movimento?:number;
  pe_proacrobacia?:boolean;
  pe_proarcanismo?:boolean;
  pe_proatletismo?:boolean;
  pe_proatuacao?:boolean;
  pe_problefar?:boolean;
  pe_profurtividade?:boolean;
  pe_prohistoria?:boolean;
  pe_prointimidacao?:boolean;
  pe_prointuicao?:boolean;
  pe_proinvestigacao?:boolean;
  pe_prolidaranimais?:boolean;
  pe_promedicina?:boolean;
  pe_pronatureza?:boolean;
  pe_propercepcao?:boolean;
  pe_propersuasao?:boolean;
  pe_proprestidigitacao?:boolean;
  pe_proreligiao?:boolean;
  pe_prosobrevivencia?:boolean;
  pe_sgcarisma?:boolean;
  pe_sgconstituicao?:boolean;
  pe_sgdestreza?:boolean;
  pe_sgforca?:boolean;
  pe_sginteligencia?:boolean;
  pe_sgsabedoria?:boolean;
}

export interface CampanhaProps{
  cp_id:string;
  cp_ativa:boolean;
  cp_descricao: string;
  cp_nome:string;
};

export function onModificador(aValor: number|undefined){
    if(aValor === undefined)
      aValor = 0;
    
    let modificador = (aValor - 10) / 2;
    return Math.floor(modificador);
}

export const jCondicao = [
  {"nome": "Sem condição", "efeito": ""},
	{"nome": "Agarrado", "efeito": "* O deslocamento da criatura se torna 0, e ela não se benifica de qualquer bônus em seu deslocamento. \n* Se encerra se um efeito, como causado pela magia onda trovejante, remover a criatura do calcance da criatura que o agarrou ou do efeito que causa a condição."},
	{"nome": "Amendrontado", "efeito": "* Sofre desvantagem em testes de atributo e jogadas de ataque enquanto a fonte do seu medo estiver na sua linha de visão. \n* A criatura não pode se mover voluntáriamente para uma posição que a faça terminar o turno mais proxima da sua fonte de medo."},
	{"nome": "Atordoado", "efeito": "* Está incapacitada, só pode falar hesitantemente. \n* Falha automaticamente em tetes de Força ou Destreza. \n* Ataque contra a criatura possuem vantagem."},
	{"nome": "Cego", "efeito": "* Falha automaticamente em testes de visão. \n* Ataque contra a criatura sofrem vantagem. \n* Ataque da criatura sofrem desvantagem."},
	{"nome": "Derrubado", "efeito": "* A única opção de movimento é rastejar. \n* Ataques da criatura sofrem desvantagem. \n* Ataques contra a criatura possuem vantagem se estiver a 1,5 metras. \n* Qualquer outra forma de jogada sobre desvantagem."},
	{"nome": "Enfeitiçado", "efeito": "* Não pode atacar quem a encantou ou tê-lo como alvo de habilidade nocivas ou efeitos mágicos. \n* Quem encaltou possui vantagem em testes de atributos feitos para interagir socialmente com a criatura."},
	{"nome": "Envenenado", "efeito": "* Desvantagem em ataques e testes de atributos."},
	{"nome": "Impedido", "efeito": "* Deslocamento 0 e sem bônus de deslocamento. \n* Ataques da criatura sofrem desvantagem. \n* Ataques contra a criatura possuem vantagem. \n* Desvantagem em testes de resistência de Destreza."},
	{"nome": "Incapacitado", "efeito": "* Não pode realizar ações e reações."},
	{"nome": "Inconciente", "efeito": "* Larga tudo que estiver segurando e fica derrubada. \n* Falha automaticamente em testes de Força e Destreza. \n* Ataques contra a criatura possuem vantagem. \n* Qualquer ataque que atinja a criatura é considerado Sucesso Critico, se o atacante estiver a 1,5 metros."},
	{"nome": "Invisivel", "efeito": "* Só pode ser visto por magia ou sentidos especiais. \n* Esconder é considerada em escuridão pesada. \n* Ataques da criatura sofrem vantagem. \n* Ataques contra a criatura sofrem desvantagem."},
	{"nome": "Paralisado", "efeito": "* Está incapacitado. Ela não pode se mover ou falar. \n* Falha automaticamente em testes de Força e Destreza. \n* Ataques contra a criatura sofrem vantagem. \n* Qualquer ataque que atinja a criatura é considerado Sucesso Critico, se o atacante estiver a 1,5 metros."},
	{"nome": "Petrificado", "efeito": "* Trasnformada junto com todos os objetos não mágicos que estiver carregando. \n	* Peso é multiplicado por 10 e não envelhece. \n * A criatura está incapacitada, não pode falar, se mover, e não tem ciência de seus arredores. \n * Ataques contra a criatura sofrem vantagem. "+
    "\n* Falha automaticamente em testes de Força e Destreza. \n* Resistência a qualquer tipo de dano. \n* A criatura é imune a veneno  doenças, veneno ou doenças previamente presentes em seus sistema fica suspensas, não neutralizadas."},
	{"nome": "Surdo", "efeito": "Falha automaticamente em testes de audição."}
]
