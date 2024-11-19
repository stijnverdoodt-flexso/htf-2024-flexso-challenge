const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    this.on('calculateDrakeValue', async (req) => {
        const { galaxyId } = req.data;

        // Fetch galaxy data
        const galaxy = await SELECT.one.from('flexso.htf.Galaxies').where({ ID: galaxyId });
        if (!galaxy) req.error(404, 'Galaxy not found');

        // Base value
        const baseValue = galaxy.numberOfSolarSystems > 100000 ? 1 : 0.66;

        // Fetch star survivability
        const habitableZones = await SELECT.from('flexso.htf.HabitableZones')
            .where({ starType_ID: galaxy.mostCommonStarType_ID });
        const starSurvivability = habitableZones.reduce((sum, zone) => sum + zone.percentage, 0) / habitableZones.length;

        // Fetch compatibility
        const compatibilityScore = await SELECT.one.from('flexso.htf.CompabilityScores')
            .where({
                planetType_ID: galaxy.mostCommonPlanetType_ID,
                alienType_ID: galaxy.mostLikelyAlienType_ID,
            });
        const compatibility = compatibilityScore ? compatibilityScore.percentage : 0;

        // Calculate Drake Value
        const drakeValue = baseValue * starSurvivability * compatibility;

        return drakeValue;
    });
});