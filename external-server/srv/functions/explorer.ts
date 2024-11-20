import * as cds from "@sap/cds";
import { isUUID } from "validator";
import { Entity, IAlienCivilisation, IGalaxy } from '../definitions/ExplorerService';


export const exploreGalaxy = async (req: cds.Request) => {
    const galaxyID = req.data?.galaxy_ID;

    let galaxyInformation : IGalaxy;

    if (galaxyID == undefined  || galaxyID.trim() === '') {
        throw {code: "400", message: "Your explorers need to know which galaxy to travel to!"}
    } else if (!isUUID(galaxyID)) {
        throw {code: "400", message: "This does not seem to be a valid galaxy ID!"}
    }

    const exploredGalaxy = await SELECT.from(Entity.Galaxies).byKey(galaxyID);

    if (exploredGalaxy == undefined) {
        throw {code: "400", message: "Your explorers do not think a galaxy by this ID exists!"}
    } else {
        galaxyInformation = {
            ID                  : exploredGalaxy.ID,
            name                : exploredGalaxy.name,
            explorationReport   : exploredGalaxy.explorationReport,
            alienCivilisation   : null
        };
    }

    if (exploredGalaxy.alienCivilisation_ID != null) {
        const alienCivilisation :IAlienCivilisation = await SELECT.from(Entity.AlienCivilisation).byKey(exploredGalaxy.alienCivilisation_ID).columns([
            "ID",
            "name",
            "alienType_ID",
            "alienStatus_ID",
            "message"
        ])
        galaxyInformation.alienCivilisation = alienCivilisation;
    }

    return galaxyInformation;
}