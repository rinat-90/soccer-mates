import { mapGetters } from 'vuex'
import dateFilter from '@/filters/dateFilter'
export const gameMixin = {
  computed: {
    ...mapGetters(['info']),
    creator () {
      return this.game != null ? this.game.creator : null
    },
    roaster () {
      return this.game != null ? this.game.roaster : []
    },
    gameImgUrl () {
      return this.game != null ? this.game.imgUrl : ''
    },
    isGoing () {
      return this.game && this.game.roaster.length ? !!this.game.roaster.find(p => p.userId === this.info.userId) : false
    },
    isCreator () {
      return this.game != null && this.info ? this.game.creator.userId === this.info.userId : false
    },
    isCanceled () {
      return this.game.status === 'canceled'
    },
    isFilled () {
      return +this.game.spots - this.game.roaster.length === 0
    },
    isFinished () {
      return this.game.status === 'finished'
    },
    isRouter () {
      return this.type === 'small' ? `/game/${this.game.id}` : ''
    },
    spots () {
      return !this.game.roaster.length
        ? `${this.game.spots} spots left`
        : this.isFilled
          ? 'All spots filled'
          : `${this.game.roaster.length} going,  ${(+this.game.spots - this.game.roaster.length)} spots left`
    },
    subtitle () {
      return this.type === 'small' ? this.spots : dateFilter(this.game.date)
    },
    width () {
      return window.innerWidth
    },
    size () {
      return this.type === 'large'
        ? this.width < 950 ? '200px' : '350px'
        : '200px'
    }
  }
}
