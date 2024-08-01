import {
  InlineLayout,
  Link,
  Text,
  View,
  useBuyerJourneySteps,
  useBuyerJourneyActiveStep,
  useShop,
  useTranslate,
  Image,
  Style,
  InlineSpacer,
} from "@shopify/ui-extensions-react/checkout";

export default function Extension() {
  const steps = useBuyerJourneySteps();
  const activeStep = useBuyerJourneyActiveStep();
  const { storefrontUrl } = useShop();
  const translate = useTranslate();

  const assembledSteps = [
    {
      label: translate("cart"),
      handle: "cart",
      to: new URL("/cart", storefrontUrl).href,
    },
    ...steps,
  ];

  const activeStepIndex = assembledSteps.findIndex(
    ({ handle }) => handle === activeStep?.handle
  );

  return (
    <InlineLayout
      accessibilityRole="orderedList"
      spacing="none"
      padding="none"
      inlineAlignment="start"
      columns={[20, "fill", "fill", "fill", "fill"]}
      display={Style.default("auto").when(
        { viewportInlineSize: { min: "small" } },
        "none"
      )}
    >
      <InlineSpacer spacing="base" />

      {assembledSteps.map(({ label, handle, to }, index) => (
        <InlineLayout
          columns={[35, "fill"]}
          blockAlignment="center"
          maxInlineSize="fill"
          padding="none"
          key={handle}
          accessibilityRole="listItem"
        >
          <View
            inlineAlignment="center"
            cornerRadius="fullyRounded"
            maxInlineSize="fill"
            padding="none"
          >
            {index < activeStepIndex || handle === "cart" ? (
              <Link to={to}>
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/completed-step.png" />
              </Link>
            ) : activeStep?.handle === handle ? (
              index === 0 ? (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/green-step-1.svg" />
              ) : index === 1 ? (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/green-step-2.svg" />
              ) : index === 2 ? (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/green-step-3.svg" />
              ) : (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/green-step-4.svg" />
              )
            ) : index === 0 ? (
              <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/step-1.png" />
            ) : index === 1 ? (
              <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/step-2.png" />
            ) : index === 2 ? (
              <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/step-3.png" />
            ) : (
              <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/step-4.png" />
            )}
            <Text>{label}</Text>
          </View>
          {index !== assembledSteps.length - 1 ? (
            <View
              inlineAlignment="center"
              cornerRadius="fullyRounded"
              maxInlineSize="fill"
              padding="none"
            >
              {index < activeStepIndex ? (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/green-bar-100x73.svg" />
              ) : (
                <Image source="https://cdn.shopify.com/s/files/1/2100/2891/files/gray-bar-100x73.svg" />
              )}
            </View>
          ) : null}
        </InlineLayout>
      ))}
    </InlineLayout>
  );
}
