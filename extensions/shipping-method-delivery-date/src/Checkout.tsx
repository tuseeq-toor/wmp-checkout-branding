import {
  reactExtension,
  Text,
  useShippingOptionTarget,
  useShippingAddress,
  useDeliveryGroups,
} from "@shopify/ui-extensions-react/checkout";
import {
  ShippingAddress,
  ShippingOption,
} from "@shopify/ui-extensions/checkout";
import { addDays, format, isSaturday, isSunday, nextMonday } from "date-fns";
import { enUS } from "date-fns/locale";

export default reactExtension(
  "purchase.checkout.shipping-option-item.render-after",
  () => <Extension />
);

function Extension() {
  const deliveryGroupList = useDeliveryGroups();
  const { shippingOptionTarget } = useShippingOptionTarget();
  const address = useShippingAddress();

  const isValidAddress = (address: ShippingAddress): boolean => {
    if (!address || !address.countryCode) return false;

    // Check if the country is South Africa (ZA) or Aruba (AW)
    if (address.countryCode === "ZA" || address.countryCode === "AW") {
      return false;
    }

    // Check if the country is United States (US) and the province is Alaska (AK) or Hawaii (HI)
    if (
      address.countryCode === "US" &&
      (address.provinceCode === "AK" || address.provinceCode === "HI")
    ) {
      return false;
    }

    // If none of the invalid conditions are met, the address is valid
    return true;
  };

  // options is Express of type 'oneTimePurchase' and is Not free
  const isValidOption = (): boolean => {
    const expressHandles = deliveryGroupList
      .map(({ deliveryOptions, groupType }) => {
        if (groupType !== "oneTimePurchase") return null;

        const expressOption = deliveryOptions.find(
          ({ title, cost }: ShippingOption) => {
            return (
              (title.includes("Express") ||
                title.includes("Expedited") ||
                title.includes("Priority")) &&
              cost?.amount !== 0
            );
          }
        );

        return expressOption?.handle;
      })
      .filter(Boolean);

    return expressHandles.some(
      (expressHandle) => expressHandle === shippingOptionTarget?.handle
    );
  };

  const date = calculateAndFormatDate();

  return (
    isValidAddress(address) &&
    isValidOption() && <Text>Arrives by: {date} | Arrives faster 🚀</Text>
  );
}

const calculateAndFormatDate = (): string => {
  let currentDate = new Date();
  let targetDate = addDays(currentDate, 3);

  // Check if the target date is Saturday or Sunday and adjust to the next Monday if needed
  if (isSaturday(targetDate) || isSunday(targetDate)) {
    targetDate = nextMonday(targetDate);
  }

  // Format the date with ordinal
  return format(targetDate, "EEEE MMMM do", { locale: enUS });
};
