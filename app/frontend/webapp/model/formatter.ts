import Decimal from "sap/ui/model/odata/type/Decimal";

export default {
  formatDistance: (distance: string): string => {
    const globalizedDistance = parseFloat(distance.replace(",", ".")).toFixed(
      1
    );
    return globalizedDistance === "1.0"
      ? `${globalizedDistance} lightyear away`
      : `${globalizedDistance} lightyears away`;
  },

  formatDrakeEquation: (drakeEquationScore: any): string => {
    return `${parseFloat(drakeEquationScore.replace(",", ".")).toFixed(
      2
    )}% chance of life`;
  },

  formatCommunicationButton: (explorationReport: string | null): boolean => {
    if (!explorationReport) {
      return true;
    }
    return false;
  },

  formatDecipherButton: (message: string | null): boolean => {
    if (!message) {
      return false;
    }
    return true;
  },
};
