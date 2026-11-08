export const CATALOG_EVIDENCE={file:"B11",page:"s.2–4",date:"08.11.2026",status:"resmi_kaynakli"} as const;
export const CATALOG_DATE="08.11.2026 · B11 kaynak inceleme tarihi";
export const panels=[
 {id:"cw",brand:"CW Enerji",model:"CWT610-144TNB10",watts:610,efficiency:23.61,vmp:44.15,imp:13.82,voc:52.78,isc:14.54,betaVoc:-.260,dimensions:[2278,1134,35],weight:29,type:"TOPCon · bifacial"},
 {id:"trina",brand:"Trina Solar",model:"TSM-NEG19RC.20",watts:610,efficiency:22.60,vmp:40.80,imp:14.96,voc:49,isc:15.83,betaVoc:-.240,dimensions:[2382,1134,30],weight:33,type:"i-TOPCon · bifacial / çift cam"},
 {id:"jinko",brand:"JinkoSolar",model:"JKM610N-78HL4",watts:610,efficiency:21.82,vmp:45.59,imp:13.38,voc:55.25,isc:14.11,betaVoc:-.250,dimensions:[2465,1134,35],weight:30.6,type:"N-type · monofacial"},
];
export const inverters=[
 {id:"huawei",brand:"Huawei",model:"SUN2000-100KTL-M2",power:"100 kW AC",maxDc:1100,mppt:10,inputs:2,mpptAmps:30,efficiency:"%98,6 @400 V",ip:"IP66",service:"FusionSolar; RS485",check:"AFCI, dongle ve Türkiye servisi yazılı teyit"},
 {id:"goodwe",brand:"GoodWe",model:"GW100K-HT",power:"100 kW AC",maxDc:1100,mppt:10,inputs:2,mpptAmps:30,efficiency:"%98,6",ip:"Teklif edilen seri veri sayfasında doğrula",service:"Platform/arayüz doğrulanacak",check:"Firmware, şebeke uyumu ve garanti teyidi"},
 {id:"sungrow",brand:"Sungrow",model:"SG110CX",power:"110 kVA (45°C); 100 kVA (50°C)",maxDc:1100,mppt:9,inputs:2,mpptAmps:26,efficiency:"%98,7",ip:"IP66",service:"iSolarCloud; RS485/opsiyon",check:"2021 katalog modeli; revizyon ve yerel servis teyidi"},
];
export function precheck(panel:typeof panels[number],inverter:typeof inverters[number],series:number,parallel:number,temp:number){
 if(!Number.isInteger(series)||series<1||series>50||!Number.isInteger(parallel)||parallel<1||parallel>10||!Number.isFinite(temp)||temp< -50||temp>25)return null;
 const coldVoc=panel.voc*(1+Math.abs(panel.betaVoc)/100*(25-temp))*series;
 const current=panel.imp*parallel;
 return {coldVoc,current,voltagePass:coldVoc<inverter.maxDc,currentPass:current<=inverter.mpptAmps,inputPass:parallel<=inverter.inputs};
}
