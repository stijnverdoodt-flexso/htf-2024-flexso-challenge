import Controller from "sap/ui/core/mvc/Controller";
import UI5Event from "sap/ui/base/Event";
import Panel from "sap/m/Panel";
import UIComponent from "sap/ui/core/UIComponent";
import { LayoutType } from "sap/f/library";
import GenericTile from "sap/m/GenericTile";
import formatter from "../model/formatter";
import Filter from "sap/ui/model/Filter";
import FilterBar from "sap/ui/comp/filterbar/FilterBar";
import SearchField from "sap/m/SearchField";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import MultiComboBox from "sap/m/MultiComboBox";
import FilterGroupItem from "sap/ui/comp/filterbar/FilterGroupItem";

/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
  public formatter = formatter;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}
  private pressPlanet(event: UI5Event) {
    (this.getOwnerComponent() as UIComponent).getRouter().navTo("Detail", {
      PlanetId: (event.getSource() as GenericTile)
        ?.getBindingContext()
        ?.getProperty("ID") as number,
      layout: LayoutType.TwoColumnsBeginExpanded,
    });
  }

  private onSearch(event: UI5Event) {
    const filterGroupItems = (
      event.getSource() as FilterBar
    ).getFilterGroupItems();
    const galaxyFilter = new Filter({
      filters: filterGroupItems.reduce((result: any[], filterGroupItem) => {
        let control = filterGroupItem.getControl();
        const filters: Filter[] = [];

        switch (filterGroupItem.getName()) {
          case "name":
            if ((control as SearchField).getValue()) {
              filters.push(
                new Filter({
                  path: filterGroupItem.getName(),
                  operator: FilterOperator.Contains,
                  value1: (control as SearchField).getValue(),
                  caseSensitive: false,
                })
              );
            }
            break;

          case "alienCivilisationStatus":
            if (
              (control as MultiComboBox).getSelectedItems() &&
              (control as MultiComboBox).getSelectedItems().length > 0
            ) {
              filters.push(
                new Filter({
                  filters: this.multiComboBoxToFilter(
                    control as MultiComboBox,
                    "AlienCivilisations/status_ID"
                  ),
                  and: false,
                })
              );
            }

            break;

          default:
            if (
              (control as MultiComboBox).getSelectedItems() &&
              (control as MultiComboBox).getSelectedItems().length > 0
            ) {
              filters.push(
                new Filter({
                  filters: this.multiComboBoxToFilter(
                    control as MultiComboBox,
                    filterGroupItem.getName()
                  ),
                  and: false,
                })
              );
            }

            break;
        }

        if (filters.length > 0) {
          result.push(
            new Filter({
              filters: filters,
              and: true,
            })
          );
        }

        return result;
      }, []),
    });

    (
      this.byId("idHrmSystemsPane")?.getBinding("content") as ODataListBinding
    ).filter(galaxyFilter);
  }

  private multiComboBoxToFilter(
    multiComboBox: MultiComboBox,
    path: string
  ): Filter[] {
    const keys = multiComboBox.getSelectedKeys();
    const subFilter: Filter[] = [];

    keys.forEach((key) => {
      subFilter.push(
        new Filter({
          path: path,
          operator: FilterOperator.EQ,
          value1: key,
        })
      );
    });

    return subFilter;
  }

  private clearFilters(event: UI5Event) {
    const filterGroupItems = (
      event.getSource() as FilterBar
    ).getFilterGroupItems();
    filterGroupItems.forEach((filterGroupItem: FilterGroupItem) => {
      const control = filterGroupItem.getControl() as
        | SearchField
        | MultiComboBox;
      control.setValue("");
      if (control instanceof MultiComboBox) {
        (control as MultiComboBox).removeAllSelectedItems();
      }
    });
  }
}
