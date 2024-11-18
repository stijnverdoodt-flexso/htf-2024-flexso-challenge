namespace flexso.htf;

using {cuid} from '@sap/cds/common';

/* Our closes galactic neighbour, Andromeda is already 2,5 light years removed from us */
type MillionLightYears  :  Decimal(10, 3);
type Percentage : Decimal(5,4);

entity Galaxies : cuid {
    name                    :   String;
    distance                :   MillionLightYears;
    numberOfSolarSystems    :   Integer;
    averagePlanetsPerSolar  :   Decimal(5,2);
    mostCommonStarType      :   Association to StarTypes;
    mostCommonPlanetType    :   Association to PlanetTypes;
    mostLikelyAlienType     :   Association to AlienTypes;
    explorationReport       :   String;
}

entity PlanetTypes  : cuid {
    name        :   String;
    description :   String;
}

entity StarTypes    : cuid {
    name        : String;
    description : String;
}

entity AlienTypes : cuid {
    name        :   String;
    description :   String;
}

entity AlienCivilisations   : cuid {
    name            :   String;
    alienType       :   Association to AlienTypes;
    homeGalaxy      :   Association to Galaxies;
    status          :   Association to AlienStatus;
    contacted       :   Boolean;
    message         :   String;
    decodedMessage  :   String;
}

entity AlienStatus  : cuid {
    name        : String;
    description : String;
}

entity CompabilityScores {
    key planetType  : Association to PlanetTypes;
    key alienType   : Association to AlienTypes;
        percentage  : Percentage;
}
entity HabitableZones {
    key starType    : Association to StarTypes;
        percentage  : Percentage;
}