
// PARTE 0: SETTING UP
export class Planificacion{
  constructor(
    public id: string,
    public id_informe: string
  ){
  }
}
export class Meta{
  constructor(
    public id: string,
    public descripcion:string
  ){

  }
}
export class Objetivos{
  constructor(
    public id: string,
    public id_meta:string,
    public peso_muscular_objetivo: string,
    public id_planificacion: string
  ){
  }
}
export class RequerimientoCronico{
  constructor(
    public id:string,
    public calorias:string,
    public CHO:string,
    public PROT: string,
    public FAT:string,
    public id_planifiacion: string
  ){

  }
}
export class Hidratacion{
  constructor(
    public id:string,
    public pre_entreno: string,
    public inter_entreno: string,
    public post_entreno: string,
    public id_planificacion:string
  ){

  }
}


// PARTE 1: PREPARACION DE PORCIONES



export class PorcionesInterCambio{
  constructor(
    public id:string,
    public id_planificacion: string
  ){
  }
}
export class PreparacionDePorciones{
  constructor(
    public id:string,
    public id_categoria: string,
    public id_por_intercambio:string,
    public id_condicion: string,
    public num_porciones: number,
    public gramos_por_porcion:number,
  ){}
}


// EXTRA: ITEMS ALIMENTARIOS y RECETAS


export interface InfoAlimentaria{
  descripcion: string;
  calorias: number;
  cho: number;
  prot: number;
  fat: number;
  sodium: number;
  sugar: number;
}


export class ItemAlimentario  {
  constructor(
    public id:string,
    public descripcion: string,
  public calorias: number,
  public cho: number,
  public prot: number,
  public fat: number,
  public sodium: number,
  public sugar: number,
  ){}
}
export class DescripcionComun{
  constructor(
    public id:string,
    public descripcion: string
  ){}
}
export class Cantidad_item_descripcion {
  constructor(
    public id:string,
    public id_item: string,
    public id_descripcion: string,
    public gramos:string
  ) {

  }
}
// un item puede pertenecer a una o más categorías
export class ItemEnCategoria{
  constructor(
    public id: string,
    public id_item: string,
    public id_categoria: string,
  ){}
}
export class Categoria{
  constructor(
    public id: string,
    public descripcion: string,
  public calorias: number,
  public cho: number,
  public prot: number,
  public fat: number,
  public sodium: number,
  public sugar: number,
  ){}
}

export class creaCategoria{
  constructor(
    public id: string,
    public id_categoria: string,
    public id_nutri:string
  ){}
}

    //RECETAS
export class RecetaGeneral{
  constructor(
    public id:string,
    public descripcion: string
  ){}
}
export class ItemEnReceta{
  constructor(
    public id: string,
    public id_receta: string,
    public id_item: string,
    public id_descripcionComun: string,
    public cantidad: string
  ){}
}
export class Tiene_condicion{
  constructor(
    public id: string,
    public id_item: string,
    public id_condicion: string
  ){}
}
export class Condicion{
  constructor(
    public id:string,
    public condicion: string
  ){}
}
// PARTE 2: DISTRIBUCION

export class DistribucionPorServicio{
  constructor(
    public id:string,
    public id_planificacion: string
  ){

  }
}
export class EspacioComida{
  constructor(
    public id:string,
    public descripcion: string
  ){}
}
export class CreaEspacioComida{
  constructor(
    public id:string,
    public id_espacio_comida: string,
    public id_nutri: string
  ){}
}

export class tComida_Distribucion{
  constructor(
    public id: string,
    public id_espaciocomida: string,
    public id_categoria: string,
    public id_distribucion_por_servicio: string,
    public cantidad: number
  ){}
}

// PARTE 3: Sugerencia de dieta
export class  Sugerencia{
  constructor(
    public id:string,
    public id_planificacion: string
  ){}
}
export class Ajustes_en_ESPC{
  constructor(
    public id:string,
    public id_ajuste:string,
    public id_espacio_comida:string,
    public id_sugerencia: string
  ){}
}
export class Ajustes{
  constructor(
    public id:string,
    public id_ajuste:string,
    public id_receta: string,
  ){}
}
export class ItemEnRecetaAjustada{
  constructor(
    public id:string,
    public id_ajuste:string,
    public id_receta:string,
    public id_item:string,
    public id_descripcion_comun:string,
    public cantidad:number
  ){}
}

