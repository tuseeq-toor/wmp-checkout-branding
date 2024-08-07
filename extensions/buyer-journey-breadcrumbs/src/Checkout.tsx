import { reactExtension } from "@shopify/ui-extensions-react/checkout";
import Extension from "./Extension";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.header.render-after", () => (
  <Extension />
));
