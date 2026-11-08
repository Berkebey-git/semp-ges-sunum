export const FINANCE_MODEL_META={status:"temsili_hesap",source:"B13 / s.5–8",date:"Kasım 2026",currency:"reel USD",taxesModeled:false} as const;
import { calculateSelfConsumptionScenario } from "./finance";
export type EpcInputs={contract:number;panels:number;inverters:number;bos:number;installation:number;engineering:number;logistics:number;quality:number;risk:number;overhead:number;advancePct:number;orderPct:number;mountPct:number};
export const DEFAULT_EPC:EpcInputs={contract:420000,panels:130000,inverters:60000,bos:77000,installation:44000,engineering:16000,logistics:11000,quality:12000,risk:16000,overhead:18000,advancePct:15,orderPct:25,mountPct:35};
export type InvestorInputs={selfPct:number;tariff:number;capex:number;om:number;degradationPct:number;discountPct:number;tariffGrowthPct:number;replacement:number;replacementYear:number;inflationPct:number;fx:number;vatPct:number};
export const DEFAULT_INVESTOR:InvestorInputs={selfPct:80,tariff:.13,capex:400000,om:6000,degradationPct:.5,discountPct:12,tariffGrowthPct:0,replacement:25000,replacementYear:12,inflationPct:0,fx:35,vatPct:20};
function invalidNumbers(values:Record<string,number>){return Object.entries(values).filter(([,v])=>!Number.isFinite(v)||Math.abs(v)>1e12).map(([k])=>`${k}: geçerli sayısal değer gerekli.`);}
export function calculateEpc(i:EpcInputs){
 const errors=invalidNumbers(i);
 if(Object.values(i).some(v=>v<0))errors.push("EPC girdileri negatif olamaz.");
 if(i.contract<=0)errors.push("Sözleşme bedeli sıfırdan büyük olmalı.");
 const acceptancePct=100-i.advancePct-i.orderPct-i.mountPct;
 if(acceptancePct<0||[i.advancePct,i.orderPct,i.mountPct].some(v=>v>100))errors.push("Tahsilat yüzdeleri toplamı %100’ü aşamaz.");
 if(errors.length)return {errors,outputs:null};
 const direct=i.panels+i.inverters+i.bos+i.installation+i.engineering+i.logistics+i.quality;
 const total=direct+i.risk+i.overhead, gross=i.contract-direct, profit=i.contract-total;
 let cumulative=0;
 const flows=[i.advancePct,i.orderPct,i.mountPct,acceptancePct].map((pct,index)=>{
   const receipt=i.contract*pct/100,payment=total*[24/384,190/384,120/384,50/384][index];cumulative+=receipt-payment;
   return {label:["Sözleşme","Sipariş","Montaj","Kabul"][index],receipt,payment,net:receipt-payment,cumulative};
 });
 return {errors,outputs:{direct,total,gross,profit,marginPct:profit/i.contract*100,flows,workingCapital:Math.max(0,-Math.min(...flows.map(f=>f.cumulative))),acceptancePct}};
}
export function npv(rate:number,flows:number[]){if(!Number.isFinite(rate)||rate<=-1||flows.some(v=>!Number.isFinite(v)))return null;const value=flows.reduce((sum,v,t)=>sum+v/Math.pow(1+rate,t),0);return Number.isFinite(value)?value:null;}
// Conservative IRR: one initial outflow followed only by nonnegative inflows guarantees at most one root.
export function irr(flows:number[]){
 if(flows.length<2||flows[0]>=0||flows.slice(1).some(v=>v<0)||!flows.slice(1).some(v=>v>0)||flows.some(v=>!Number.isFinite(v)))return null;
 let lo=-.9999,hi=1;const lowNpv=npv(lo,flows);if(lowNpv===null||lowNpv<0)return null;let hiNpv=npv(hi,flows);
 while(hiNpv!==null&&hiNpv>0&&hi<1e6){hi*=2;hiNpv=npv(hi,flows);}
 if(hiNpv===null||hiNpv>0)return null;
 for(let n=0;n<180;n++){const mid=(lo+hi)/2,value=npv(mid,flows);if(value===null)return null;if(value>0)lo=mid;else hi=mid;}
 return (lo+hi)/2;
}
export function calculateInvestor(i:InvestorInputs,powerKwp:number,annualEnergyKwh:number){
 const errors=invalidNumbers(i);
 if(!Number.isFinite(powerKwp)||powerKwp<=0||!Number.isFinite(annualEnergyKwh)||annualEnergyKwh<0)errors.push("Aktif enerji senaryosu geçerli olmalı.");
 for(const key of ["selfPct","degradationPct","discountPct","inflationPct","vatPct"] as const)if(i[key]<0||i[key]>100)errors.push(`${key}: %0–100 aralığı gerekli.`);
 for(const key of ["tariff","capex","om","replacement"] as const)if(i[key]<0)errors.push(`${key}: negatif olamaz.`);
 if(i.fx<=0||i.tariffGrowthPct< -20||i.tariffGrowthPct>20||!Number.isInteger(i.replacementYear)||i.replacementYear<1||i.replacementYear>25)errors.push("Kur pozitif, reel tarife artışı −%20…20, yenileme yılı 1–25 tamsayı olmalı.");
 if(errors.length)return {errors,outputs:null};
 const yearly=Array.from({length:25},(_,index)=>{
   const year=index+1,generation=annualEnergyKwh*Math.pow(1-i.degradationPct/100,index);
   const base=calculateSelfConsumptionScenario({powerKwp,specificYield:generation/powerKwp,selfConsumptionPct:i.selfPct,unitValueUsd:i.tariff*Math.pow(1+i.tariffGrowthPct/100,index),capexUsd:i.capex,omUsd:i.om});
   const replacement=year===i.replacementYear?i.replacement:0,net=base.netContributionUsd-replacement;
   return {year,generation,savings:base.grossSavingsUsd,om:i.om,replacement,net,nominal:net*Math.pow(1+i.inflationPct/100,year)};
 });
 const first=calculateSelfConsumptionScenario({powerKwp,specificYield:annualEnergyKwh/powerKwp,selfConsumptionPct:i.selfPct,unitValueUsd:i.tariff,capexUsd:i.capex,omUsd:i.om});
 const flows=[-i.capex,...yearly.map(y=>y.net)],value=npv(i.discountPct/100,flows),rate=irr(flows);
 return {errors,outputs:{yearly,flows,npv:value,irr:rate,first,nominalDiscountPct:((1+i.discountPct/100)*(1+i.inflationPct/100)-1)*100,vatMemo:i.capex*i.vatPct/100}};
}
export const CASES=[{id:"bad",label:"Kötümser",energy:.9,cost:1.1,tariff:.9},{id:"base",label:"Baz",energy:1,cost:1,tariff:1},{id:"good",label:"İyimser",energy:1.1,cost:.95,tariff:1.1}] as const;
