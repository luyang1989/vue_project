<template>
 <div>
 <div class="item_bock head_p">
        <div class="head_img">
            <img :src="avator" />
        </div>
        <div class="setting_right" @click.stop="uploadHeadImg">
        <div class="caption">更改头像</div>
        </div>
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar:""
      },
    };
  },
  components: {},
  methods: {
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示/userPerson
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
          console.log(data)
        let res = data.target || data.srcElement;
        this.$store.state.avator = res.result;
      };
      reader.readAsDataURL(file);

      //请求
      var picData=new FormData();
      picData.append('file',file,file.name);
        this.$http({
            url:"/userPerson/person/uploadFileToFast",
            method:'post',
            data:picData,
        })
        .then(response=>{
            console.log(response)
            if(response){
            this.$message.success("成功")
                this.userInfo.avatar=response.data.result;
            }else{
                this.$message.error("失败")
            }
        })
        .catch(Error=>{
                        
        })
    }
  },
  created(){
           
  }, 
  computed: {
    avator(){
        return this.$store.state.avator
    }
  }

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
