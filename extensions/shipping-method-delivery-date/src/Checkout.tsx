import {
  reactExtension,
  Text,
  useSubscription,
  useShippingOptionTarget,
} from "@shopify/ui-extensions-react/checkout";
import { addDays, format, isSaturday, isSunday, nextMonday } from "date-fns";
import { enUS } from "date-fns/locale";

export default reactExtension(
  "purchase.checkout.shipping-option-item.render-after",
  () => <Extension />
);

function Extension() {
  const { shippingOptionTarget } = useShippingOptionTarget();
  const isExpressOption =
    shippingOptionTarget.title.indexOf("Express") !== -1 ||
    shippingOptionTarget.title.indexOf("Expedited") !== -1 ||
    shippingOptionTarget.title.indexOf("Priority") !== -1;
  const date = calculateAndFormatDate();
  return (
    isExpressOption && (
      <Text>
        Arrives by: {date} | Arrives faster 🚀 {shippingOptionTarget.type}
      </Text>
    )
  );
}

const calculateAndFormatDate = () => {
  let currentDate = new Date();
  let targetDate = addDays(currentDate, 3);

  // Check if the target date is Saturday or Sunday and adjust to the next Monday if needed
  if (isSaturday(targetDate) || isSunday(targetDate)) {
    targetDate = nextMonday(targetDate);
  }

  // Format the date with ordinal
  return format(targetDate, "EEEE MMMM do", { locale: enUS });
};
