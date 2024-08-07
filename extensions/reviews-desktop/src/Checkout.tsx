import {
  reactExtension,
  BlockStack,
  View,
  Text,
  Heading,
  HeadingGroup,
  Image,
  Style,
  TextBlock,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { saleText, subHeadline1, subHeadline2, mainHeadline } = useSettings();

  const sale = saleText ?? "";
  const firstHeadline = subHeadline1 ?? "";
  const secondHeadline = subHeadline2 ?? "";
  const mainHead = mainHeadline ?? "";

  return (
    <View
      display={Style.default("none").when(
        { viewportInlineSize: { min: "medium" } },
        "auto"
      )}
      inlineAlignment="center"
    >
      <BlockStack inlineAlignment="center" maxInlineSize="fill">
        <View inlineAlignment="center">
          <TextBlock
            emphasis="bold"
            size="large"
            inlineAlignment="center"
            appearance="critical"
          >
            {sale}
          </TextBlock>
          <TextBlock emphasis="bold" size="small" inlineAlignment="center">
            {firstHeadline}
          </TextBlock>
          <HeadingGroup>
            <Heading level={1} inlineAlignment="center">
              {mainHead}
            </Heading>
          </HeadingGroup>
          <TextBlock inlineAlignment="center">{secondHeadline}</TextBlock>
        </View>
        <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/checkout-review-01.svg" />
        <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/checkout-review-02.svg" />
        <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/checkout-review-03.svg" />
      </BlockStack>
    </View>
  );
}
