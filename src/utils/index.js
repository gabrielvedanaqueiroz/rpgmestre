


  //metodo para mostrar uma imagem dependendo da classe do personagem
  export function getImagem(aClasse){

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