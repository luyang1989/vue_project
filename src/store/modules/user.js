import img from '../../assets/img/person_picture.png'
import { login} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    avatar: img,
    token: getToken(),  

  },

  mutations: {

    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }

  },

  actions: {
    UserAvatar({commit},avatar){
        commit('SET_AVATAR',avatar)
    },
  }
}

export default user
