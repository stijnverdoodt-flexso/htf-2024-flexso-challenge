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
                numberOfPlanets,
                explorationReport,
                mostCommonStarType,
                mostCommonPlanetType,
                mostLikelyAlienType,
                cast((baseDrakeScore * starHabitabilityScore * alienCompabilityScore) * 100 as Decimal(5, 2))  as drakeEquation,
                AlienCivilisations                                               : Association to ContactedAlienCivilisations on AlienCivilisations.homeGalaxy.ID = $self.ID
        }
        actions {
            action decipherMessage(type : String) returns String;
            
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

    action sendCommunicationRequest(@mandatory galaxy_ID : String)     returns String;
}

define view DetailedGalaxiesView 
    as select from datamodel.Galaxies as Galaxies
    join datamodel.HabitableZones as HabitableZones
        on Galaxies.mostCommonStarType.ID = HabitableZones.starType.ID
    join datamodel.CompabilityScores as CompabilityScores
        on  Galaxies.mostCommonPlanetType.ID    = CompabilityScores.planetType.ID
        and Galaxies.mostLikelyAlienType.ID     = CompabilityScores.alienType.ID
    {
        key ID,
            name,
            distance,
            numberOfSolarSystems,
            averagePlanetsPerSolar,
            numberOfSolarSystems * averagePlanetsPerSolar as numberOfPlanets : Double,
            explorationReport,
            mostCommonStarType,
            mostCommonPlanetType,
            mostLikelyAlienType,
            case
                when $self.numberOfPlanets > 100000000000  THEN 1
                else 0.66
            end as baseDrakeScore,
            HabitableZones.percentage    as starHabitabilityScore   : datamodel.Percentage,
            CompabilityScores.percentage as alienCompabilityScore   : datamodel.Percentage
    };