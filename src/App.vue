<template>
  <div id="app" class="app">
    <div class="container app__container">
      <the-header class="app__header" />
      <div class="app__row">
        <t-button @click="newGame" class="app__button">New Game</t-button>
        <transition
          enter-active-class="animate__animated animate__fadeIn faster"
          leave-active-class="animate__animated animate__fadeOut faster"
        >
          <component v-if="!isWin" class="queue" :is="nextStep" :class="nextStep" :key='nextStep' />
        </transition>
      </div>
      <div class="grid app__grid" :class="{_draw: isWin && isWin.value === 'draw'}">
        <transition @enter="lineEnter" @leave="lineLeave" :css="false">
          <span
            v-if="!!isWin && isWin.value !== 'draw'"
            class="line"
            :class="[getWinType, getWinIdx]"
          ></span>
        </transition>
        <t-cell
          class="grid__cell"
          @click="() => toggleCell(0, idx)"
          :value="item"
          v-for="(item, idx) in grid[0]"
          :key="`0-${idx}`"
        />
        <t-cell
          class="grid__cell"
          @click="() => toggleCell(1, idx)"
          :value="item"
          v-for="(item, idx) in grid[1]"
          :key="`1-${idx}`"
        />
        <t-cell
          class="grid__cell"
          @click="() => toggleCell(2, idx)"
          :value="item"
          v-for="(item, idx) in grid[2]"
          :key="`2-${idx}`"
        />
      </div>
      <transition
        enter-active-class="animate__animated animate__tada"
        leave-active-class="animate__animated animate__fadeOut faster"
      >
        <div class="result" v-if="isWin">
          <component
            v-if="isWin && isWin.value !== 'draw'"
            class="result__icon"
            :is="isWin && isWin.value"
            :class="isWin.value"
          />
          <h2 class="result__title">{{isWin && isWin.value === 'draw' ? 'draw' : 'win'}}</h2>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Velocity from "velocity-animate";
import TheHeader from "./components/TheHeader";
import TCell from "./components/common/TCell";

const grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

export default {
  name: "App",
  components: {
    TheHeader,
    TCell
  },
  data: () => ({
    grid: [...grid],
    queue: false
  }),
  methods: {
    newGame() {
      this.grid = [...grid];
    },
    toggleCell(gridIdx, cellIdx) {
      const row = [...this.grid[gridIdx]];
      if (!row[cellIdx] && !this.isWin) {
        row.splice(cellIdx, 1, this.queue ? "zero" : "cross");
        this.grid.splice(gridIdx, 1, row);
        this.queue = !this.queue;
      }
    },
    lineEnter(el, done) {
      Velocity(el, { maxWidth: "150%" }, { duration: 200, complete: done });
    },
    lineLeave(el, done) {
      Velocity(el, { maxWidth: "0%" }, { duration: 200, complete: done });
    }
  },
  computed: {
    getWinType() {
      return this.isWin?.type;
    },
    getWinIdx() {
      return this.isWin?.idx || this.isWin?.idx === 0
        ? `${this.getWinType}--${this.isWin?.idx}`
        : null;
    },
    nextStep() {
      return this.queue ? "zero" : "cross";
    },
    isWin() {
      const { grid } = this;
      const winByRow = () => {
        let idx;
        const result =
          grid.find((row, rowIdx) => {
            const winRow = row[0] && row[0] === row[1] && row[1] === row[2];
            if (winRow) {
              idx = rowIdx;
            }
            return winRow;
          }) || [];
        return result[0] ? { value: result[0], type: "row", idx } : null;
      };
      const winByCol = () => {
        let idx;
        const isWinRow = colIdx => {
          const winCol =
            grid[0][colIdx] === grid[1][colIdx] &&
            grid[1][colIdx] === grid[2][colIdx] &&
            grid[0][colIdx];
          if (winCol) idx = colIdx;
          return winCol;
        };
        const result = [0, 1, 2].map(isWinRow).find(cell => cell);
        return result && { value: result, type: "col", idx };
      };
      const winByDiagonal = () => {
        let idx;
        const isWinCol = cellIdx => {
          const winRow =
            grid[0][cellIdx] === grid[1][1] &&
            grid[1][1] === grid[2][cellIdx ? 0 : 2] &&
            grid[1][1];
          if (winRow) idx = cellIdx;
          return winRow;
        };
        const result = [0, 2].map(isWinCol).find(cell => cell);
        return result && { value: result, type: "diagonal", idx };
      };
      const isDraw = () => {
        const shallowCopy = [...grid.flat()].sort();
        return shallowCopy.every(cell => cell)
          ? { value: "draw", type: "draw" }
          : null;
      };
      return winByRow() || winByCol() || winByDiagonal() || isDraw() || null;
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/vars";
.app {
  padding: 32px 16px;
  min-height: 100vh;
  @media screen and (min-width: 450px) {
    padding: 80px 24px 12px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 42px;
  }
  &__header {
    margin-bottom: 42px;
    @media screen and (min-width: 450px) {
      margin-bottom: 60px;
    }
  }
  &__grid {
    margin-bottom: 32px;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  grid-template-rows: repeat(3, 90px);
  border: 2px solid $main-color;
  border-radius: 4px;
  justify-items: stretch;
  align-items: stretch;
  position: relative;
  transition: all 0.2s ease;
  @media screen and (min-width: 450px) {
    grid-template-columns: repeat(3, 128px);
    grid-template-rows: repeat(3, 128px);
  }
  &._draw {
    border-color: $draw-color;
    .grid__cell {
      border-color: $draw-color;
    }
  }
}
.queue {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 34px;
  height: 34px;
  &.cross {
    fill: $cross-color;
  }
  &.zero {
    fill: $zero-color;
  }
}
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  &__icon {
    width: 80px;
    height: 80px;
    margin-right: 32px;
    &.cross {
      fill: $cross-color;
    }
    &.zero {
      fill: $zero-color;
    }
  }
  &__title {
    color: white;
    font-size: 80px;
    text-transform: uppercase;
  }
}
.line {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background-color: $draw-color;
  transition: width 1s ease;
  &.row {
    transform: translateY(-50%);
    &--0 {
      top: 16.6%;
    }
    &--1 {
      top: 50%;
    }
    &--2 {
      top: 83.3%;
    }
  }
  &.col {
    transform-origin: 0 0;
    transform: rotate(90deg);
    top: 0;
    &--0 {
      left: calc(16.6% + 3px);
    }
    &--1 {
      left: calc(50% + 3px);
    }
    &--2 {
      left: calc(83.3% + 3px);
    }
  }
  &.diagonal {
    width: calc(100% * 1.41 - 4px);
    &--0 {
      transform-origin: 0 0;
      transform: rotate(45deg);
      left: 4px;
    }
    &--2 {
      top: -2px;
      transform-origin: 100% 100%;
      right: 0px;
      transform: rotate(-45deg);
    }
  }
}
</style>
