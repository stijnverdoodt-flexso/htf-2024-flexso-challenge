import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import UI5Event from "sap/ui/base/Event";
import formatter from "../model/formatter";
/**
 *  @namespace flexso.htf.frontend.frontend.controller
 */
export default class Detail extends Controller {
  public formatter = formatter;
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    (this?.getOwnerComponent() as UIComponent)
      ?.getRouter()
      ?.getRoute("Detail")
      ?.attachPatternMatched(this.onRouteMatched.bind(this));
  }

  private onRouteMatched(event: UI5Event) {
    const { GalaxyId } = event.getParameter("arguments" as never) as {
      GalaxyId: string;
      layout: string;
    };

    this.getView()?.bindElement(`/KnownGalaxies('${GalaxyId}')`);
  }

  public onCloseDetail(): void {
    (this.getOwnerComponent() as UIComponent)
      .getRouter()
      .navTo("RouteMaster", {});
  }
}
