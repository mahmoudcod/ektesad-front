<template lang="pug">
transition(name='modal')
  .popup
    .popup-bg(@click="$emit('close')")
    button.button.is-clean.is-line.is-massive.popup-close(@click="$emit('close')") #[b-icon(name="close")]
    .popup-body
      slot


</template>

<script>
import BIcon from "~/components/icon";

export default {
  name: "b-popup",
  components: {
    BIcon
  }
};
</script>

<style lang="stylus">
.popup
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: auto
  background-color: none
  transition: opacity 0.3s ease
  display: flex
  justify-content: center
  align-items: center

  &-close
    position: fixed !important
    right: unitRes(20, 40)
    top: unitRes(20, 40)

    .icon
      fill: $clWhite

  &-bg
    background: rgba(0, 0, 0, 0.5)
    position: absolute
    z-index: -1
    right: 0
    top: 0
    left: 0
    bottom: 0

  &-body
    width: 60%
    overflow: auto
    max-height: 90vh

    +mq($until: 'widescreen')
      max-width: 60%

    +mq($until: 'desktop')
      max-width: 80%

    +mq($until: 'tablet')
      max-width: 100%

  &-footer
    display: flex
    justify-content: space-around
    align-items: center
    flex-wrap: wrap

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container, .modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)
</style>
