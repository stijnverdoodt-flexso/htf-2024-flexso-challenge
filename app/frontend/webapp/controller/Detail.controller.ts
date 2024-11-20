import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import UI5Event from "sap/ui/base/Event";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import formatter from "../model/formatter";
/**
 *  @namespace flexso.htf.frontend.frontend.controller
 */
export default class Detail extends Controller {
  public formatter = formatter;
  private galaxy_ID: string;
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    (this?.getOwnerComponent() as UIComponent)
      ?.getRouter()
      ?.getRoute("Detail")
      ?.attachPatternMatched(this.onRouteMatched.bind(this));
  }

  private onRouteMatched(event: UI5Event) {
    const { PlanetId } = event.getParameter("arguments" as never) as {
      PlanetId: string;
      layout: string;
    };

    this.getView()?.bindElement(`/KnownGalaxies('${PlanetId}')`, {
      $expand:
        "mostCommonStarType,mostCommonPlanetType,mostLikelyAlienType,AlienCivilisations($expand=alienType,status)",
      $select: "AlienCivilisations/status/name",
    });

    this.galaxy_ID = PlanetId;
  }

  async sendRequest() {
    const context = this.getView()
      ?.getModel()
      ?.createBindingContext(
        `${this.getView()?.getBindingContext()?.getPath()}`
      );

    const contextBinding = this.getView()
      ?.getModel()
      ?.bindContext("/sendCommunicationRequest(...)") as ODataContextBinding;

    contextBinding.setParameter("galaxy_ID", this.galaxy_ID);

    await contextBinding.invoke();

    this.getView()?.getElementBinding()?.refresh();
  }

  public onCloseDetail(): void {
    (this.getOwnerComponent() as UIComponent)
      .getRouter()
      .navTo("RouteMaster", {});
  }

  public async decipherMessage(event: UI5Event) {
    const context = this.getView()
      ?.getModel()
      ?.createBindingContext(
        `${this.getView()?.getBindingContext()?.getPath()}`
      );

    const contextBinding = this.getView()
      ?.getModel()
      ?.bindContext(
        `${this.getView()
          ?.getBindingContext()
          ?.getPath()}/ExplorationService.decipherMessage(...)`,
        context
      ) as ODataContextBinding;

    contextBinding.setParameter("type", event.getParameter("item").getText());

    await contextBinding.invoke();

    this.getView()?.getElementBinding()?.refresh();
  }
}
