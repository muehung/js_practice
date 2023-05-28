<script setup>
</script>

<template>
	<!-- <welcomeItem />
	<tableItem/> -->
	<!-- <div>
		{{ data1 }}
		<template v-for="{ item } in data1[0]" :key="item.value">
			<div class="table table-responsive">
				<div class=""></div>
				<div class=""> {{  }} </div>
				<div class=""> {{ key }} </div>
			</div>
		{{ data1 }}
		</template>
	</div> -->

	<table class="table table-striped table-responsive">
		<thead>
			<th class="col">KEY</th>
			<th class="col">CELL1</th>
			<th class="col">CELL2</th>
			<th class="col">CELL3</th>
			<th class="col">CELL4</th>
			<th class="col">CELL5</th>
			<th class="col">CELL6</th>
			<th class="col">CELL7</th>
			<th class="col">CELL8</th>
			<th class="col">CELL9</th>
		</thead>
		<tbody class="tbody">
			<!-- {{ mergedData }} -->
			<template v-for="obj in mergedData" :key="obj.key">
				<tr>
					<td class="col">{{ obj.key }}</td>
					<td class="col"> {{ obj.cell1 }}</td>
					<td class="col"> {{ obj.cell2 }}</td>
					<td class="col"> {{ obj.cell3 }}</td>
					<td class="col"> {{ obj.cell4 }}</td>
					<td class="col"> {{ obj.cell5 }}</td>
					<td class="col"> {{ obj.cell6 }}</td>
					<td class="col"> {{ obj.cell7 }}</td>
					<td class="col"> {{ obj.cell8 }}</td>
				</tr>
			</template>
			<!-- {{ tableData2 }} -->
			
				
					
				<!-- <td class="col">{{ row.cell8 }}</td>
				<td class="col">{{ row.cell9 }}</td> -->
			<!-- <tr>
				<td>tableData2
					<template v-for="row in tableData2" :key="row.key">
						{{ row }}
					</template>
				</td>
				<td>tableData3
				<template v-for="row in tableData3" :key="row.key">
					{{ row }}
				</template>
				</td>
			</tr> -->
		</tbody>
		</table>
</template>

<script>
export default {
	data() {
		return {
			// tableData1: [],
			tableData2: [],
			// tableData3: [],
			mergedData: {}
		};
	},
	computed(){},
	async created() {
			
		// console.log(this.mergedData)

			
			

			// 不能用 ...，因為 [{}] + [{}]，主要是 {}要合併
			// const mergData = {key:'data1', ...data1, 'key':'data2', ...data2}
			
			// 先把 [] 拿開，一筆筆比對 key, 回傳是 array(v-for)

			// Array map, forEach, filter
			// const mergData =  Object.assign({} )
			// console.log(mergData)
			// this.mergedData = mergData;
			// console.log(this.mergedData)
	},
	beforeMount() {
	},
	async mounted() {
		const data1 = await this.fetchData1()
		const data2 = await this.fetchData2()

		// from https://ithelp.ithome.com.tw/articles/10225733
		// const data2Key = Object.assign(data2[0]);
		// const data2Key = data2[1].key;
		// console.log('data2Key')
		// console.log(data2Key)


		// const data3 = await this.fetchData3()
		console.log(`data1:`)
		console.log(data1)
		console.log(`data2:`)
		console.log(data2);
		// console.log(`data3:`)
		// console.log(data3)

		this.mergedData = data1.map(row1 => {
			// filter 比對 data1 row1.key 和 data2.key 一樣就刪掉
			
			// data2.cell8
			let filtered = data2.filter(r => r.key == row1.key)
			if( filtered.length == 0){ return row1 };
			
			// console.log('filtered----')
			// console.log(filtered)
			let row2 = filtered[0] // Object {key:R0, cell8: "1C34T"}
			console.log('row2')
			console.log(row2)

			const re = Object.assign({}, row1, row2)

			console.log('re')
			console.log(re)
			return re
		})

		
		
		// try {
		// 	this.tableData1 = await this.fetchData1()
		// 	this.tableData2 = await this.fetchData2()
		// 	this.tableData3 = await this.fetchData3()
		// 	console.log(this.tableData1)
		// 	console.log(this.tableData2)
		// 	console.log(this.tableData3)
		// } catch (error) {
		// 		console.error(error)
		// }
	},
	methods: {
		// fetch api template
		async fetchTemp(url) {
			const response = await fetch(url)
			// when error
			if(!response.ok){
				throw new Error('response not ok')
			}
			// when ok return
			return await response.json()
		},
		// fetch data1
		async fetchData1() {
			return await this.fetchTemp("../data/data1.json")
		},
		async fetchData2() {
			return await this.fetchTemp("../data/data2.json")
		},
		async fetchData3() {
			return await this.fetchTemp("../data/data3.json")
		},
  }
}
</script>

<style scoped>
</style>
