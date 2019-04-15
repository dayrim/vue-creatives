<template>
  <div>
    <h3>My Creatives</h3>
    <button @click="toggleAddMode">Add</button>
    <hr />
    <transition name="fade">
      <new-creative v-if="addMode"></new-creative>
    </transition>

    <transition v-if="creatives.length > 0" name="fadeInUp" mode="out-in">
      <transition-group tag="table" name="fadeInUp" mode="out-in">
        <tr key="headers">
          <th>Name</th>
          <th>Device</th>
          <th>Size</th>
        </tr>
        <tr
          v-for="(creative, index) in creatives"
          :key="index"
          @click="removeCreative(creative.id)"
        >
          <td>{{ creative.name }}</td>
          <td>
            {{ creative.device }}
          </td>
          <td>
            {{ creative.size }}
          </td>
        </tr>
      </transition-group>
    </transition>

    <transition v-else name="fadeInUp" mode="out-in">
      <p>No creatives found</p>
    </transition>
  </div>
</template>
<script>
import NewCreative from "./NewCreative.vue";
import { TOGGLE_ADD_MODE, REMOVE_CREATIVE, ADD_CREATIVE, MODIFY_CREATIVE } from "../data/constants";
import database from "../data/database";

export default {
  components: {
    newCreative: NewCreative,
  },
  computed: {
    addMode() {
      return this.$store.state.addMode;
    },
    creatives() {
      return this.$store.state.creatives;
    },
  },
  created() {
    this.$store.state.database.collection("creatives").onSnapshot(snapCreatives => {
      let source = snapCreatives.metadata.hasPendingWrites ? "Local" : "Server";

      snapCreatives.docChanges().forEach(snapCreative => {
        let docCreative = snapCreative.doc;
        let id = docCreative.id;
        if (snapCreative.type === "added") {
          this.$store.dispatch(ADD_CREATIVE, { ...docCreative.data(), id });
        }
        if (snapCreative.type === "modified") {
          this.$store.dispatch(MODIFY_CREATIVE, { ...docCreative.data(), id });
        }
        if (snapCreative.type === "removed") {
          this.$store.dispatch(REMOVE_CREATIVE, docCreative.id);
        }
      });
    });
  },
  methods: {
    toggleAddMode() {
      this.$store.dispatch(TOGGLE_ADD_MODE);
    },
    removeCreative(id) {
      this.$store.state.database
        .collection("creatives")
        .doc(id)
        .delete();
    },
  },
};
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
