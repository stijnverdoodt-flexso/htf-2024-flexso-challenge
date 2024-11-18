import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import JSONModel from "sap/ui/model/json/JSONModel";
import { LayoutType } from "sap/f/library";

/**
 * @namespace flexso.htf.frontend.frontend
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json"
	};

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
	public init() : void {
		// call the base component's init function
		super.init();
      this.setModel(new JSONModel(), "appView");
      this.getRouter().attachBeforeRouteMatched(
        (event) => this.onBeforeRouteMatched(event),
        this
    );
        // enable routing
        this.getRouter().initialize();
        

        // set the device model
        this.setModel(createDeviceModel(), "device");
	}

    onBeforeRouteMatched(event: any): void {
        (this.getModel("appView") as JSONModel).setProperty(
          "/layout",
          event.getParameters().arguments.layout || LayoutType.OneColumn
        );
      }
}