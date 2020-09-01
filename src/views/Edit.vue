<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="userImg">
      <van-uploader :after-read="afterRead" />
      <img :src="$base + user.head_img" alt />
    </div>
    <nav-item @click="showNickname">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </nav-item>
    <nav-item @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </nav-item>
    <nav-item @click="showGender">
      <template>性别</template>
      <template #content>{{user.gender===1 ? '男' :'女'}}</template>
    </nav-item>
    <van-dialog v-model="isshowNickname" title="编辑昵称" show-cancel-button @confirm="updataNickname">
      <van-field v-model="nickname" ref="nickname" />
    </van-dialog>
    <van-dialog v-model="isshowPassword" title="修改密码" show-cancel-button @confirm="updataPassword">
      <van-field v-model="password" ref="password" />
    </van-dialog>
    <van-dialog v-model="isshowGender" title="修改性别" show-cancel-button @confirm="updataGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-show='isshowMask'>
        <van-button type='primary' class="crop" @click='crop' >裁剪</van-button>
        <van-button type='danger' class="cancel" @click='cancel'>取消</van-button>
         <vue-cropper :img='img' autoCrop autoCropWidth='150' autoCropHeight='150' ref='cropper'> </vue-cropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {

  data () {
    return {
      user: {},
      isshowNickname: false,
      isshowPassword: false,
      isshowGender: false,
      isshowMask: false,
      nickname: '',
      password: '',
      gender: '',
      img: ''
    }
  },
  async created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const userId = localStorage.getItem('userId')
      const res = await this.axios.get('/user/' + userId)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async showNickname () {
      this.isshowNickname = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async showPassword () {
      this.isshowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    showGender () {
      this.isshowGender = true
      this.gender = this.user.gender
    },
    async updataPassword () {
      this.updataUser({ password: this.password })
    },
    async updataNickname () {
      this.updataUser({ nickname: this.nickname })
    },
    updataGender () {
      this.updataUser({ gender: this.gender })
    },
    async updataUser (obj) {
      const userId = localStorage.getItem('userId')
      const res = await this.axios.post(`/user_update/${userId}`, obj)
      if (res.data.statusCode === 200) {
        this.getUser()
        this.$toast.success('修改成功')
      }
    },
    crop () {
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updataUser({ head_img: data.url })
          this.isshowMask = false
        }
      })
    },
    cancel () {
      this.isshowMask = false
    },
    isImg (name) {
      if (name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg') || name.endsWith('.gif')) {
        return true
      } else {
        return false
      }
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传正确的图片')
      } else if (file.file.size >= 2000 * 1024) {
        return this.$toast.fail('上传的图片过大')
      }

      this.isshowMask = true
      this.img = file.content
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang='less' scoped>
.userImg {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  img {
    width: 100%;
    height: 100%;
  }
  .van-uploader {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
/deep/ .van-dialog__content {
  padding: 15px;
}
.van-field {
  border: 1px solid #ccc;
}
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .crop,
    .cancel{
        position: fixed;
        top: 0;
        z-index: 1;

    }
    .cancel {
        right: 0;
    }
}
</style>
