<script setup>
import { ref } from 'vue';
  const data = ref([
    {
      id: 1,
      name: "珍珠奶茶",
      description: "香濃奶茶搭配QQ珍珠",
      price: 50,
      stock: 20,
    },{
      id: 2,
      name: "冬瓜檸檬",
      description: "清新冬瓜配上新鮮檸檬",
      price: 45,
      stock: 18,
    },{
      id: 3,
      name: "翡翠檸檬",
      description: "綠茶與檸檬的完美結合",
      price: 55,
      stock: 34,
    },{
      id: 4,
      name: "四季春茶",
      description: "香醇四季春茶，回甘無比",
      price: 45,
      stock: 10,
    },{
      id: 5,
      name: "阿薩姆奶茶",
      description: "阿薩姆紅茶搭配香醇鮮奶",
      price: 50,
      stock: 25,
    },{
      id: 6,
      name: "檸檬冰茶",
      description: "檸檬與冰茶的清新組合",
      price: 45,
      stock: 20,
    },{
      id: 7,
      name: "芒果綠茶",
      description: "芒果與綠茶的獨特風味",
      price: 55,
      stock: 18,
    },{
      id: 8,
      name: "抹茶拿鐵",
      description: "抹茶與鮮奶的絕配",
      price: 60,
      stock: 20,
    },]);

    const items = ref(data.value);

    const tempItem = ref({
      id: items.value.length,
      name: "",
      description: "",
      price: Number,
      stock: Number,
    });

    const addNewItem = ()=> {
      items.value.push(tempItem.value);
      console.log('tempItem: ', tempItem.value);
      console.log('items: ', items.value)
    }

    function handleStock(id, stock){
      items.value = items.value.map((item)=>{
        if(item.id === id){
          item.stock = stock;
          console.log(items.value)
        console.log(item.stock)
        }
        return item //!!!!!!!!
      })
      // if(items.value.id === id && type === "minus"){
      //   items.value.stock - 1;
      // } else if(items.value.id === id && type === "add"){
      //   items.value.stock + 1;
      // } else {
      //   console.log('Oooops!')
      // }
    }

      
    
</script>

<template>
  <div class="wrapper">
    <div class="">
      <div class="">
        {{ tempItem.name }}, {{ tempItem.description  }}, {{ tempItem.price }}, {{ tempItem.stock }}</div>
      <input type="text" v-model="tempItem.name" placeholder="新增品項">
      <input type="text" v-model="tempItem.description" placeholder="新增描述">
      <input type="number" v-model="tempItem.price" placeholder="新增價格">
      <input type="number" v-model="tempItem.stock" placeholder="新增庫存數">
      <button type="button" @click="addNewItem">新增</button>
    </div>

    <table>
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td><small>{{ item.description }}</small></td>
          <td>{{ item.price }}</td>
          <td>
            <button type="button" v-on:click="handleStock(item.id, item.stock - 1)">-</button>
            {{ item.stock }}
            <button type="button" @click="handleStock(item.id, item.stock + 1)">+</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- <header>
    <div class="wrapper">
      {{ num }}
      <button type="button" v-on:click="addOnce">Click</button>
    </div>
  </header> -->

  <main>
    
  </main>
</template>

<style scoped>

</style>
