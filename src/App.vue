<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import ProductsSearchForm from './components/ProductsSearchForm.vue';
import ProductsSort from './components/ProductsSort.vue';
import ProductsList from './components/ProductsList.vue';
import type { Product, SortOption } from './types';
import { request } from './api';

const ENDPOINTS = {
  search: '/search',
  default: '/product-listing/e435c9763b0d44fcab67ea1c0fdb3fa0'
}
const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Najtańsze',
    value: 'price-asc'
  }, {
    label: 'Najdroższe',
    value: 'price-desc'
  }
];
const searchQuery = ref<string>("");
const sortDirection = ref<string>(SORT_OPTIONS[0].value);
const products = ref<Product[]>([]);

watchEffect(() => { getProducts() });

async function getProducts() {
  const searchParams = { page: '1', limit: '30', order: sortDirection.value };

  try {
    if (!searchQuery.value) {
      products.value = await request<Product[]>(ENDPOINTS['default'], searchParams);
    } else {
      products.value = await request<Product[]>(ENDPOINTS['search'], {
        search: searchQuery.value,
        ...searchParams
      });
    }
  } catch (e: unknown) {
    // TODO error handling or remove and add suspense with error handling
  }
}
</script>

<template>
  <header>
    <nav class="navbar bg-dark">
      <div class="container">
        <h1><a class="navbar-brand text-white" href="/">Shopware Listing</a></h1>
        <div class="d-flex">
          <ProductsSort v-model="sortDirection" :options="SORT_OPTIONS" />
        </div>
      </div>
    </nav>
    <ProductsSearchForm v-model="searchQuery" :delay="800" />
  </header>
  <main class="container br-tietiary mb-5">
    <div v-if="products.length === 0">
      Nie znaleziono produktów
    </div>
    <section v-else>
      <ProductsList :products="products" />
    </section>
  </main>
</template>

<style scoped>
.search-form {
  height: 200px;
}
</style>