import { reactive, computed, toRefs} from '@vue/composition-api'
import store from '../store'
export default function useGame (id) {
  const state = reactive({
    gameA: computed(() => store.getters.gameById(id)),
    userA: computed(() => store.getters.info)
  })
  const isCreatorA = computed(() => {
    return state.gameA.creatorId === state.userId
  })

  return {
    isCreatorA,
    ...toRefs(state)
  }

}
