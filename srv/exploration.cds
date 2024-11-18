using {flexso.htf as datamodel} from '../db/schema';

service ExplorationService {
    @readonly
    entity KnownGalaxies               as
        projection on DetailedGalaxiesView {
            key ID,
                name,
                distance,
                numberOfSolarSystems,
                averagePlanetsPerSolar,
                explorationReport,
                mostCommonStarType,
                mostCommonPlanetType,
                mostLikelyAlienType
        }

    @readonly
    entity ContactedAlienCivilisations as projection on datamodel.AlienCivilisations;

    @readonly
    entity KnownPlanetTypes            as projection on datamodel.PlanetTypes;

    @readonly
    entity KnownStarTypes              as projection on datamodel.StarTypes;

    @readonly
    entity KnownAlienTypes             as projection on datamodel.AlienTypes;

    @readonly
    entity KnownAlienStatus            as projection on datamodel.AlienStatus;
}

define view DetailedGalaxiesView 
    as select from datamodel.Galaxies as Galaxies
    {
        key ID,
            name,
            distance,
            numberOfSolarSystems,
            averagePlanetsPerSolar,
            explorationReport,
            mostCommonStarType,
            mostCommonPlanetType,
            mostLikelyAlienType
    };