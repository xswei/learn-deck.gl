<template>
  <div class="mapbox-wrapper">
    <div class="mabbox" ref="mapbox"></div>
    <canvas class="deck" ref="canvas"></canvas>
  </div>
</template>
<script>
import { Deck } from "@deck.gl/core";
import { ScatterplotLayer, PointCloudLayer } from "@deck.gl/layers";
import TripsLayer from "@deck.gl/experimental-layers/dist/esm/trips-layer";
import Mapbox from "@/utils/mapbox";
import { generatePoints, generatePaths } from "@/utils";
import { clearInterval } from "timers";
import * as d3 from "d3";

export default {
  name: "MapBox",
  data() {
    return {
      init_view_state: {
        latitude: 39.54,
        longitude: 116.25,
        zoom: 6,
        bearing: 0,
        pitch: 0
      },
      animationTime: 0
    };
  },
  methods: {
    initScene() {
      this.$map = new Mapbox({
        container: this.$refs.mapbox,
        style: "mapbox://styles/mapbox/dark-v9",
        viewState: this.init_view_state
      });
      this.$deck = new Deck({
        canvas: this.$refs.canvas,
        width: "100%",
        height: "100%",
        initialViewState: this.init_view_state,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          this.$map.setProps({ viewState });
        },
        onLoad: () => {
          this.onLoad();
        },
        layers: [
          new PointCloudLayer({
            id: "cloud-points",
            // data: [...this.$points],
            radiusPixels: 4,
            getPosition: d => {
              return [d.longitude, d.latitude, 6];
            },
            getNormal: d => {
              return [-1, 0, 0];
            },
            getColor: d => {
              return [222, 0, 0];
            },
            dataComparator: "lodash.isequal"
            // dataComparator(old, newData) {
            //   console.log(old, newData);
            // }
          })
        ]
      });
    },
    getCloudLayer() {
      return new PointCloudLayer({
        id: "cloud-points",
        data: this.$points,
        radiusPixels: 4,
        getPosition: d => {
          return [d.longitude, d.latitude, 6];
        },
        getNormal: d => {
          return [-1, 0, 0];
        },
        getColor: d => {
          return [222, 0, 0];
        }
      });
    },
    getTripsLayer() {
      return new TripsLayer({
        id: "trips",
        data: this.$paths,
        getPath: d => {
          return d;
        },
        getColor: d => {
          return [253, 128, 93];
        },
        opacity: 1,
        strokeWidth: 10,
        trailLength: 100,
        currentTime: this.animationTime
      });
    },
    animate() {
      this.$playtimer = d3.interval(() => {
        this.updateTrips();
      }, 300);
    },
    updateTrips() {
      const loopLength = 1800;
      const animationSpeed = 30;
      const timestamp = Date.now() / 1000;
      const loopTime = loopLength / animationSpeed;
      this.animationTime = ((timestamp % loopTime) / loopTime) * loopLength;
      // console.log(this.animationTime)
      this.resetLayers();
    },
    onLoad() {
      console.log("reset layers", this.$points.length, this.$paths.length);
      this.$playtimer && this.$playtimer.stop();
      this.resetLayers();
      // this.$timer = d3.interval(() => {
      //   this.$playtimer.stop();
      //   this.getPaths();
      //   this.resetLayers();
      // }, 1000 * 10);
      this.animate();
    },
    resetLayers() {
      // console.log("reset layers", this.$points.length, this.$paths.length);
      this.$deck.setProps({
        layers: [this.getCloudLayer(), this.getTripsLayer()]
      });
      //
    },
    getPaths() {
      this.$paths = generatePaths(1000);
    }
  },
  mounted() {
    this.initScene();
    this.$points = generatePoints(1000);
    // console.log(this.$points);
  },
  created() {
    this.$points = [];
    this.$paths = generatePaths(100);
    // console.log(this.$paths);
  },
  beforeDestroy() {
    this.$timer && this.$timer.stop();
    this.$playtimer.stop();
  }
};
</script>
<style lang="less" scoped>
.mapbox-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  div,
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
