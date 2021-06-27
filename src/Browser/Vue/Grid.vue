<template>
  <div class="grid-wrapper">
    <div
      v-for="(columnValue, columnIndex) in grid"
      :key="columnIndex"
      class="grid-column"
    >
      <div
        v-for="(node, rowIndex) in columnValue"
        :key="rowIndex"
      >
        <NodeComponent
          :node="node"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GridModel from '../../Models/Grid';
import NodeComponent from './Node.vue';

@Component({
  components: {
    NodeComponent
  }
})
export default class GridComponent extends Vue {
  @Prop()
  private grid!: GridModel;

  mounted() {
    console.log(this.grid);
  }
}
</script>

<style scoped>
.grid-wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
}

.maze-entry {
  background-color: white;
  width: 50px;
  height: 50px;
  /* border-right: 1px solid black;
  border-bottom: 1px solid black; */
}
</style>
