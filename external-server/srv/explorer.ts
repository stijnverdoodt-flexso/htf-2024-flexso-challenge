import * as cds from '@sap/cds';
import * as Explorer from './functions/explorer';

export = (srv: cds.Service) => {
    srv.on("exploreGalaxy", (req) => {
        return Explorer.exploreGalaxy(req)
    });
};