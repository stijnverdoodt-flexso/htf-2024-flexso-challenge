export default {
    formatDistance: (distance: string): string => {
        const globalizedDistance = parseFloat(distance.replace(",", ".")).toFixed(
          1
        );
        return globalizedDistance === "1.0"
          ? `${globalizedDistance} lightyear away`
          : `${globalizedDistance} lightyears away`;
    },
};
