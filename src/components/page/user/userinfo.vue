<template>
 <div>
 <div class="item_bock head_p">
        <div class="head_img">
            <img :src="avatar" />
        </div>
        <div class="setting_right" @click.stop="uploadHeadImg">
        <div class="caption">更改头像</div>
        </div>
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    };
  },
  components: {},
  computed: {
      ...mapGetters([
        'avatar'
        ])
    },
    created(){
    },
  methods: {
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示/userPerson
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
        // base64方法 2
      var reader = new FileReader();
      reader.readAsDataURL(file);// 读出 base64
      reader.onload = data => {
         // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        let res = data.target || data.srcElement; 
        this.$store.dispatch("UserAvatar",res.result)
      };
      let picData=new FormData(); // 创建form对象 
      var userId = localStorage.getItem('userId')
      this.userId = userId
      // 通过append向form对象添加数据
      picData.append('file',file,file.name);
      picData.append("userId", this.userId);
       let config = {
        headers:{'Content-Type':'multipart/form-data'}
       };
      this.$http({
            url:"/api/person/person/uploadFileToFast",
            method:'post',
            data:picData
        })
        .then(response=>{
            if(response){
            this.$message.success("成功")
            this.$store.dispatch("UserAvatar","http://10.0.41.102:9870/"+response.data.result.filepath)
            this.getUploadPicture()
            }else{
                this.$message.error("失败")
            }
        })
        .catch(Error=>{
        })
    },
    getUploadPicture(){
       this.$http({
          url:"/api/person/person/getPhotoByUserID", 
          method: "post",
          params:{
            userId:this.userId
          },
          headers: {
            "Content-Type": "application/json"
          }
      }).then(res => {
          
      })
    }
  },
 
};
</script>
 <style lang="css" scoped>
.Fbtn {
  text-align: center;
}
.personmsg {
  width: 50%;
  margin: 100px auto;
  padding: 80px 30px 150px 30px;
  background: white;
}
.user-avator {
  text-align: center;
  margin-bottom: 50px;
}
.user-avator img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  text-align: center;
}
.el-form-item__content {
  text-align: center;
} 
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 94px;
  width: 300px;
  padding: 0px 24px 0px 38px;
  margin: 0 auto;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_p {
  height: 132px;
  margin-bottom: 50px;
}
.head_img {
  height: 90px;
}
.head_img img {
  width: 90px;
  height: 90px;
  border-radius: 50px;
}
.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput {
  display: none;
}
.caption {
  color: #8f8f8f;
  font-size: 26px;
  height: 37px;
}
</style>