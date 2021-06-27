<template>
  <div
    class="maze-entry"
    v-bind:class="{
      north: this.north,
      east: this.east,
      south: this.south,
      west: this.west
    }"
  >
    ({{ node.coordinate.x }}, {{ node.coordinate.y }})
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NodeModel from '../../Models/Node';
import EntityModel from '../../Models/Entity';

@Component
export default class NodeComponent extends Vue {
  @Prop()
  private node!: NodeModel;

  get north()  {
    return this.node && this.node.north === EntityModel.WALL;
  }

  get east()  {
    return this.node && this.node.east === EntityModel.WALL;
  }

  get south()  {
    return this.node && this.node.south === EntityModel.WALL;
  }

  get west()  {
    return this.node && this.node.west === EntityModel.WALL;
  }
}
</script>

<style scoped>
.maze-entry {
  background-color: white;
  width: 50px;
  height: 50px;
  border: 1px solid white;
}

.maze-entry.north {
  border-top: 1px solid black;
}

.maze-entry.east {
  border-right: 1px solid black;
}

.maze-entry.south {
  border-bottom: 1px solid black;
}

.maze-entry.west {
  border-left: 1px solid black;
}
</style>
