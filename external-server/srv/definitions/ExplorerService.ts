import { __UUID } from "@sap/cds";

export enum Entity {
    Galaxies = 'flexso.htf.explorer.Galaxies',
    AlienCivilisation = 'flexso.htf.explorer.AlienCivilisations'
}

export interface IGalaxy {
    ID : __UUID,
    name: string,
    explorationReport: string,
    alienCivilisation: IAlienCivilisation | null
}

export interface IAlienCivilisation {
    ID          : __UUID;
    name        : String;
    alienType   : __UUID;
    alienStatus : __UUID;
    message     : String;
}