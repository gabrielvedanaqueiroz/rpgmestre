
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
  pe_propersusao?:boolean;
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