import { reactive, computed, toRefs, onMounted } from '@vue/composition-api'
import store from '../store'
export default function useGame (id) {
  const state = reactive({
    game: computed(() => store.getters.gameById(id)),
    user: computed(() => store.getters.info )
  });

  const goingPlayers = computed(() => {
    return Object.values(state.game.going)
  });

  const isCreator = computed(() => {
    return state.game.creatorId === state.userId
  });

  return {
    goingPlayers,
    isCreator,
    ...toRefs(state)
  }

}
