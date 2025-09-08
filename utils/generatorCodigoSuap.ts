export default function generatorCodigoSuap(nameDicente:string){
    const sufixo = Math.floor(10000 + Math.random() * 90000);
    const nameDicenteArray = nameDicente.toLowerCase().split("");
    const prefixo = nameDicenteArray[0]+nameDicenteArray[1]+nameDicenteArray[2]
    const codigoDoSuap = prefixo+sufixo;

    return codigoDoSuap;
}