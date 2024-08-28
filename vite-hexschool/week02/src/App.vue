<script setup>
import axios from 'axios';
import { ref } from 'vue';

// 這邊都放data
const baseUrl = "https://todolist-api.hexschool.io";
const SignupUserData = ref({
  email: "",
  password: "",
  nickname: "",
});
const loginUserData = ref({
  email: "",
  password: "",
});
const GuestUser = ref({
  name: "",
  token: "",
  exp: Number,
})
const errMsg = ref("");
const uid = ref("");

// 這邊開始放程式
const SignUp = async function(){
  await axios.post(`${baseUrl}/users/sign_up`, 
    SignupUserData.value)
    .then((response)=>{
      uid.value = response.data.uid;
      // from https://axios-http.com/zh/docs/res_schema
      console.log('SignUp res data', response.data);
      console.log('SignUp res status',response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);
    })
    // info https://axios-http.com/zh/docs/handling_errors
    .catch((err)=>{
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.data.message);
      // console.log(err.response.status);
      // console.log(err.response.headers);
      errMsg.value = err.response.data.message;
    } else if (err.rquest){
      console.log('SignUp err', err.request)
      errMsg.value = err.request;
    } else {
      console.log('SignUp Error: ', err.message)
      errMsg.value = err.message;
    };
  })
}
const login = async function(){
    await axios.post(`${baseUrl}/users/sign_in`,loginUserData.value)
    .then((response)=>{
      GuestUser.value.name = response.data.nickname;
      GuestUser.value.token = response.data.token;
    })
    .then(()=>{
      // `${GuestUser.value.token}; expires=${GuestUser.value.exp};SameSite=None;Secure`
      const dueDate = new Date();
      const Guestcookie = document.cookie = `GuestToken=${GuestUser.value.token}; expires=${dueDate.toUTCString()}`; // /toUTCString() 看老師的，不知道啥意思？？？
      console.log('login Guestcookie' , Guestcookie);
    }).catch((err)=>{
    if(err.response){
      console.log('login', err.response.data);
      // console.log(err.response.data.message);
      errMsg.value = err.response.data.message;
    } else if (err.rquest){
      console.log(err.request)
      errMsg.value = err.request;
    } else {
      console.log('login Error: ', err.message)
      errMsg.value = err.message;
    };
  })
};

// 驗證
// 給token，拿回uid和狀態
const verifyUser = ref({
  token: '',
  status: '',
});
const checkToken = async function(){
  verifyUser.value.token = GuestUser.value.token;
  await axios.get(`${baseUrl}/users/checkout`,{
    // 找不到怎麼寫，最後參考老師的
    headers: {
      Authorization: verifyUser.value.token,
    }})
  .then((response)=>{
    console.log("verifyUser response", response)
    console.log("verifyUser response", response.data) // object
    console.log("verifyUser response", response.data.status)//true
    console.log("verifyUser response", response.status) //200
    verifyUser.value.status = response.data.status
  })
  .catch((err)=>{
    console.log("verifyUser err", err.message)
  })
};

let logoutResponse = {};
// 登出
const logOut = async function(){
  // 問 chatgpt，才知道要第二個 {},，和headers
  await axios.post(`${baseUrl}/users/sign_out`, {}, {
    headers: {
      Authorization: verifyUser.value.token,
    }
  })
  .then((response)=>{
    // console.log("logout response", response)
    // console.log("logout response", response.data) // object
    // console.log("logout response", response.data.status)//true
    // console.log("logout response", response.status) //200
    logoutResponse.value = response.data
    console.log('logoutResponse', logoutResponse.value)
  })
  .catch((err)=>{
    console.error('logout err', err)
  })
}


// onMounted(()=>{
  // let cookieValue = cookies.get('HihiToken');
  // console.log(cookieValue);
  // cookies.set("HihiToken", GuestUser.value.token)
  // console.log(document.cookie)
  // const cookiesA = document.cookie
  // cookiesA.useCookies.set("HihiToken", GuestUser.value.token)
// });

</script>
<template>
  <div v-if="errMsg">errMsg: {{ errMsg }}</div>
  <hr>
  <h2>註冊</h2>
  <input v-model="SignupUserData.email" type="text" placeholder="Email">
  <input v-model="SignupUserData.password" type="password" placeholder="password">
  <input v-model="SignupUserData.nickname" type="text" placeholder="Nickname">
  <button type="button" @click="SignUp">Sign up</button>
  {{ SignupUserData }}
  <div v-if="uid">uid: {{ uid }}</div>
  
  <h2>登入</h2>
  <input v-model="loginUserData.email" type="text" placeholder="Email">
  <input v-model="loginUserData.password" type="password" placeholder="password">
  <button type="button" @click="login">Login</button>
  {{ loginUserData }}
  <div v-if="GuestUser.token">Hi! {{GuestUser.name }},your token: {{GuestUser.token}}</div>



  <h2>驗證</h2>
  <!-- <div v-if="verifyUser.token">Hi! {{GuestUser.name }}</div>
  <p v-else>你還沒登入喔！</p> -->
  <input v-model="verifyUser.token" type="text" placeholder="Token">
  <button type="button" @click="checkToken">Check Out</button>
  <p v-if="verifyUser.status === true">已驗證 OK</p>

  <h2>登出</h2>
  <input type="button" @click="logOut" value="登出">
  <p>{{ logoutResponse.message }}</p>
</template>