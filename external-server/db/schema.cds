namespace flexso.htf.explorer;

using {cuid} from '@sap/cds/common';

type Galaxy_ID : UUID;

entity Galaxies: cuid {
    name                : String;
    explorationReport   : String;
    alienCivilisation   : Association to AlienCivilisations;
}

entity AlienCivilisations: cuid {
    name            : String;
    alienType       : Association to AlienTypes;
    alienStatus     : Association to AlienStatus;
    message         : String;
}

entity AlienStatus  : cuid {
    name        : String;
    description : String;
}

entity AlienTypes : cuid {
    name        :   String;
    description :   String;
}