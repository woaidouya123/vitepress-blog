<div class="game-container">
  <div class="op">
    <el-switch v-model="blackFirst" active-text="执黑" @change="refresh" />
    <el-switch v-model="robot" active-text="人机" active-value="white" :inactive-value="false" @change="refresh" />
    <el-button :icon="Refresh" @click="refresh" circle />
  </div>
  <go-bang :lines="13" :width="500" :height="500" :black-first="blackFirst" :robot="robot" :key="gameKey" />
</div>

<script lang="ts" setup>
import goBang from '../../view/gobang/index.vue';
import { ElButton, ElSwitch } from 'element-plus';
import {
  Refresh
} from '@element-plus/icons-vue';
import { ref } from "vue";
let gameKey = ref(0);
let blackFirst = ref(true);
let robot = ref("white");
const refresh = () => {
  gameKey.value++;
}
</script>
<style scoped>
  .game-container {
    text-align: center
  }
  .op .el-switch {
    margin-right: 20px
  }
</style>
