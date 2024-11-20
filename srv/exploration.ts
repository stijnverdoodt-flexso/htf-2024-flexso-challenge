import * as cds from "@sap/cds";
import * as KnownGalaxies from "./entities/exploration";

export = (srv: cds.Service) => {
  srv.on("sendCommunicationRequest", (req) => {
    return KnownGalaxies.sendCommunicationRequest(req);
  });

  srv.on("decipherMessage", "KnownGalaxies", (req) => {
    return KnownGalaxies.decipherMessage(req);
  });
};
