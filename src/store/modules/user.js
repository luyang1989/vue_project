import img from '../../assets/img/person_picture.png'
const user = {
  state: {
    avatar: img,
  },

  mutations: {

    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },

  },

  actions: {
    UserAvatar({commit},avatar){
        commit('SET_AVATAR',avatar)
    }
  }
}

export default user
