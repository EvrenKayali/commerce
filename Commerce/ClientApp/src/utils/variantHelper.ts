import {
  ProductOption,
  ProductVariant,
  VariantOptionAttribute,
} from "../api/api";

export function filterVariants(
  variants: ProductVariant[],
  filters: ProductOption[]
) {
  return variants.filter((i) => filtersMatch(filters, i.optionAttributes));
}

function filtersMatch(
  filters: ProductOption[],
  attributes?: VariantOptionAttribute[]
) {
  if (!Boolean(attributes?.length) || !Boolean(filters.length)) return false;
  const result = filters
    .filter((x) => x.values.length > 0)
    .every((f) => {
      const atval = attributes?.find((attr) => attr.name === f.name)?.value;
      if (atval) {
        return f.values.includes(atval);
      }
      return false;
    });
  return result;
}
