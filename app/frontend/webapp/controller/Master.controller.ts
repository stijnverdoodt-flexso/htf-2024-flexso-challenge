import Controller from "sap/ui/core/mvc/Controller";
import formatter from "../model/formatter";


/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
  public formatter = formatter;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}
}
