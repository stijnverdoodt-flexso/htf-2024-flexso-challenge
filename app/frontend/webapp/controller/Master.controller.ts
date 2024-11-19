import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
    public onInit(): void {
        this._calculateDrakeValue("<GALAXY_ID>");
    }

    private async _calculateDrakeValue(galaxyId: string): Promise<void> {
        try {
            const response = await fetch(`/drake-service/calculateDrakeValue?galaxyId=${galaxyId}`);
            const drakeValue = await response.json();

            console.log(`Drake Value for Galaxy ${galaxyId}:`, drakeValue);
            // Update model or UI based on result
        } catch (error) {
            console.error("Error calculating Drake Value:", error);
        }
    }
}