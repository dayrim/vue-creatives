import { Module, VuexModule, getModule, Action, Mutation } from "vuex-module-decorators";
import store from "@/store";
import { Creatives, Creative } from "./interfaces";

@Module({
  dynamic: true,
  namespaced: true,
  name: "creatives",
  store,
})
class CreativeModule extends VuexModule implements Creatives {
  public creatives: Creative[] = [];
  public addMode: Boolean = false;

  @Mutation
  private ADD_CREATIVE(creative: Creative) {
    this.creatives.push(creative);
  }
  @Mutation
  private TOGGLE_ADD_MODE() {
    if (!this.addMode) {
      this.addMode = true;
    } else {
      this.addMode = false;
    }
  }
  @Mutation
  private REMOVE_CREATIVE(id: string) {
    this.creatives = this.creatives.filter(creative => creative.id !== id);
  }
  @Action({ commit: "ADD_CREATIVE" })
  public AddCreative(creative: Creative) {
    return creative;
  }
  @Action({ commit: "REMOVE_CREATIVE" })
  public RemoveCreative(id: string) {
    return id;
  }
  @Action({ commit: "TOGGLE_ADD_MODE" })
  public ToggleAddMode() {
    return "";
  }
}

export default getModule(CreativeModule);
