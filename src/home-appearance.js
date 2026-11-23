import {analysis,dayInfo,today} from './domain.js';

// Presentazione soltanto: non calcola fasi, non cambia dati o previsioni.
export const homePalettes={
 light:{mestruazioni:'#fff1f5',quotidiano:'#f4f3ff',neutro:'#fdf4ff'},
 dark:{mestruazioni:'#241622',quotidiano:'#171525',neutro:'#17101f'},
};
export function homeTone(state,date=today()){
 if(!state.periods.length)return 'neutro';
 if(dayInfo(state,date,date).per)return 'mestruazioni';
 const projection=analysis(state,date).prediction;
 if(projection&&projection.high<date)return 'neutro';
 return 'quotidiano';
}
