import { ProductOption, Variant, VariantOptionAttribute } from "../api/api";

export function filterVariants(variants: Variant[], filters: ProductOption[]) {
  return variants.filter((i) => filtersMatch(filters, i.attributes));
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
