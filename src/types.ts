export type Product = {
  id: string;
  name: string;
  description: string;
  calculatedCheapestPrice: {
    unitPrice: number;
  }
}

export type SortOption = {
  label: string;
  value: string;
};