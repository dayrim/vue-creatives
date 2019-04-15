<template>
  <div>
    <h3>My Creatives</h3>
    <button @click="toggleAddMode">Add</button>
    <hr />
    <transition name="fade"> <new-creative v-if="addMode"></new-creative> </transition>

    <transition v-if="creatives.length > 0" name="fadeInUp" mode="out-in">
      <transition-group tag="table" name="fadeInUp" mode="out-in">
        <tr key="headers">
          <th>Name</th>
          <th>Device</th>
          <th>Size</th>
        </tr>
        <tr
          v-for="(creative, index) in creatives"
          :key="index + 'id'"
          @click="removeCreative(creative.id)"
        >
          <td>{{ creative.name }}</td>
          <td>{{ creative.device }}</td>
          <td>{{ creative.size }}</td>
        </tr>
      </transition-group>
    </transition>

    <transition v-else name="fadeInUp" mode="out-in"> <p>No creatives found</p> </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FirestoreModule from "@/store/modules/firestore/firestore";
import CreativesModule from "@/store/modules/creatives/creatives";
import NewCreative from "@/components/NewCreative.vue";

@Component({
  components: {
    NewCreative,
  },
})
export default class CreativeList extends Vue {
  get firestore() {
    return FirestoreModule.firestore;
  }
  get creatives() {
    return CreativesModule.creatives;
  }
  get addMode() {
    return CreativesModule.addMode;
  }
  created() {
    this.firestore
      .collection("creatives")
      .onSnapshot(function(snapCreatives: import("firebase").firestore.QuerySnapshot) {
        let source = snapCreatives.metadata.hasPendingWrites ? "Local" : "Server";
        snapCreatives
          .docChanges()
          .forEach(function(snapCreative: import("firebase").firestore.DocumentChange) {
            let docCreative = snapCreative.doc;
            let creative = {
              name: docCreative.data().name,
              device: docCreative.data().device,
              size: docCreative.data().size,
              id: docCreative.id,
            };
            if (snapCreative.type === "added") {
              CreativesModule.AddCreative(creative);
            }
            if (snapCreative.type === "removed") {
              CreativesModule.RemoveCreative(creative.id);
            }
          });
      });
  }
  removeCreative(id: string) {
    this.firestore
      .collection("creatives")
      .doc(id)
      .delete();
  }
  toggleAddMode() {
    CreativesModule.ToggleAddMode();
  }
}
</script>
<style scoped lang="scss">
h3 {
  display: inline-block;
  margin: 0 30px 0 30px;
}
table {
  margin-top: 40px;
  &:before {
    font-size: 10px;
    content: "* Click to remove a creative";
  }
}
</style>
