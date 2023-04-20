<script setup lang="ts">
import { Product } from '../types';

defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="row gy-4">
    <div v-for="product in products" class="col-md-6 col-lg-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ product.name ?? 'Brak nazwy produktu' }}</h5>
          <p class="card-text">
            {{ product.description ?? 'Brak opisu produktu, o szczegóły dopytaj u sprzedawcy' }}
          </p>
        </div>
        <div class="card-footer">
          <span class="mt-2 text-body-secondary">
            <strong>Cena: </strong>
            {{ product.calculatedCheapestPrice.unitPrice }} zł
          </span>
        </div>
      </div>
    </div>
  </div>
</template>