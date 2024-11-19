import Controller from "sap/ui/core/mvc/Controller";
import formatter from "../model/formatter";
import UIComponent from "sap/ui/core/UIComponent";
import GenericTile from "sap/m/GenericTile";
import { LayoutType } from "sap/f/library";
import UI5Event from "sap/ui/base/Event";


/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
  public formatter = formatter;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  private pressPlanet(event: UI5Event) {
    (this.getOwnerComponent() as UIComponent).getRouter().navTo("Detail", {
      GalaxyId: (event.getSource() as GenericTile)
        ?.getBindingContext()
        ?.getProperty("ID") as number,
      layout: LayoutType.TwoColumnsBeginExpanded,
    });
  }

  private onSearch(event: UI5Event) {}

  private clearFilters(event: UI5Event) {}
}
