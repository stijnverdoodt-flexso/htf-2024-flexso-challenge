import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
/**
 * @namespace flexso.htf.frontend.frontend
 */
export default class Component extends BaseComponent {
    static metadata = {
        manifest: "json"
    };
    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init() {
        // call the base component's init function
        super.init();
        // enable routing
        this.getRouter().initialize();
        // set the device model
        this.setModel(createDeviceModel(), "device");
    }
}
