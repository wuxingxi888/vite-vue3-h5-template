<script setup lang="ts"></script>

<template>
	<div class="wrap">
		<ul>
			<li v-for="(item, index) in 100" :key="index">{{ item }}</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	height: 100%;
	background-color: red;
	text-align: center;
	z-index: 99999;
}
</style>
