export interface Materia{
    id?:string,
    nombre : string,
    cuatrimestre? : number,
    cupos? : number,
    profesor? : string,
    alumnos? : Array<string>
}