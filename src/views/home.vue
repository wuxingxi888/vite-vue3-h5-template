<script setup lang="ts"></script>

<template>
	<div class="wrap fix-iphone">
		<ul>
			<li v-for="(item, index) in 100" :key="index">{{ item }}</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	text-align: center;
}
</style>
