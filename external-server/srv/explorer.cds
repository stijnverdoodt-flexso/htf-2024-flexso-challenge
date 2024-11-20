service ExplorerService {
    @readonly
    type Galaxy {
        ID      : UUID;
        name    : String;
        alienCivilisation : AlienCivilisation;
    }
    
    @readonly
    type AlienCivilisation {
        ID              : UUID;
        name            : String;
        alienType       : UUID;
        alienStatus     : UUID;
        message         : String;
    }
    
    function exploreGalaxy(galaxy_ID : UUID) returns Galaxy;
}